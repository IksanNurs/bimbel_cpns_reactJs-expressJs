'use strict';
const { Order, Product, User, MidtransNotification } = require('../models');  // Assuming Order, Product, and User models
const { validationResult } = require('express-validator');  // Validation imports
const { v4: uuidv4 } = require('uuid');  // Mengimpor fungsi uuidv4
const crypto = require('crypto');
const axios = require('axios');



const cancelMidtransOrder = async (req, res) => {
  const { id } = req.params; // Get order ID from URL params

  // Build the cancellation URL based on the environment
  const isProduction = process.env.MIDTRANS_ENV === 'production';
  const url = isProduction
    ? `https://api.midtrans.com/v2/${id}/cancel`
    : `https://api.sandbox.midtrans.com/v2/${id}/cancel`;

  try {
    // Send POST request to Midtrans API to cancel the order
    const response = await axios.post(url, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64')}`,  // Basic Auth
      },
    });

    // Update order in DB (Assuming Sequelize ORM and Order model)
    const dbResponse = await Order.update(
      { cancelled_at: new Date().toISOString() },
      { where: { id: id } }
    );

    // If the update is successful, send the response
    res.status(200).json({
      message: 'Order cancelled successfully',
      data: dbResponse,
    });

  } catch (error) {
    console.error('Error canceling order:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to cancel order', error: error.message });
  }
};


const getMidtransOrderStatus = async (req, res) => {
  const { id } = req.query;  // Order ID from query parameters
  
  // Build the Midtrans API URL for checking order status
  const isProduction = process.env.MIDTRANS_ENV === 'production';
  const url = isProduction
    ? `https://api.midtrans.com/v2/${id}/status`
    : `https://api.sandbox.midtrans.com/v2/${id}/status`;

  try {
    // Send GET request to Midtrans API to fetch the order status
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64')}`,  // Basic Auth
      },
    });

    // Assuming the response contains the order status and related data
    const transactionStatus = response.data.transaction_status;
    const orderUUID = response.data.order_id;

    // Update the order status in the DB (assuming Sequelize ORM)
    const order = await Order.findOne({ where: { uuid: orderUUID } });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order based on the transaction status from Midtrans
    let updateData = {};
    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      updateData = { paid_at: new Date().toISOString() };
    } else if (transactionStatus === 'deny' || transactionStatus === 'expire') {
      updateData = { expired_at: new Date().toISOString() };
    } else if (transactionStatus === 'cancel') {
      updateData = { cancelled_at: new Date().toISOString() };
    }

    if (Object.keys(updateData).length > 0) {
      await Order.update(updateData, { where: { uuid: orderUUID } });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      data: response.data,
    });

  } catch (error) {
    console.error('Error checking order status:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to check order status', error: error.message });
  }
};

async function createMidtransNotification(req, res) {
    const { 
        order_id, 
        status_code, 
        gross_amount, 
        signature_key, 
        transaction_id, 
        transaction_time, 
        transaction_status, 
        fraud_status, 
        payment_type 
    } = req.body;

     // Validate request body
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     
    try {
      // Fetch the order from the database
      const order = await Order.findOne({ where: { uuid: order_id } });
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
          data: null
        });
      }

      // Update the 'checked_out_at' timestamp when the notification is received
      await Order.update({ checked_out_at: Math.floor(Date.now() / 1000) }, { where: { uuid: order_id } });

      // Verify the signature
      const amount = order.amount + '.00';
      const combinedString = `${order.uuid}${status_code}${amount}${process.env.MIDTRANS_SERVER_KEY}`;
      const hash = crypto.createHash('sha512').update(combinedString).digest('hex');

    //   console.log(hash)

      // If the signature is invalid, return a 403 error
      if (signature_key !== hash) {
        return res.status(403).json({
          message: 'Invalid Signature',
          data: null
        });
      }

      // Store the Midtrans notification data in the database
     const midtrans_notification=  await MidtransNotification.create({
        order_id: order.id,
        order_uuid: order_id, 
        status_code, 
        gross_amount:order.amount, 
        signature_key, 
        transaction_id, 
        transaction_time, 
        transaction_status, 
        fraud_status, 
        payment_type 
      });

      // Process payment status and update the order accordingly
      if (transaction_status === 'capture' || transaction_status === 'settlement') {
        // Successful payment
        await Order.update({ paid_at: Math.floor(Date.now() / 1000), transaction_id:transaction_id }, { where: { uuid: order_id } });
      } else if (transaction_status === 'deny' || transaction_status === 'expire') {
        // Payment failed
        await Order.update({ expired_at: Math.floor(Date.now() / 1000), transaction_id:transaction_id }, { where: { uuid: order_id } });
      } else if (transaction_status === 'cancel') {
        // Payment canceled
        await Order.update({ cancelled_at: Math.floor(Date.now() / 1000), transaction_id:transaction_id }, { where: { uuid: order_id } });
      }

      // Return a success response with the updated order data
      return res.status(200).json({
        message: 'Notification processed successfully',
        data: midtrans_notification,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        data: null,
        error: error.message,
      });
    }
}


const getMidtransFinish = (req, res) => {
    res.redirect(process.env.FRONTEND_DOMAIN ,303)
  
};
  
const getMidtransUnfinish = (req, res) => {
  res.redirect(process.env.FRONTEND_DOMAIN ,303)

};

const getMidtransError = (req, res) => {
  res.redirect(process.env.FRONTEND_DOMAIN ,303)
};


module.exports = {
 createMidtransNotification,
 getMidtransFinish,
 getMidtransUnfinish,
 getMidtransError,
 getMidtransOrderStatus,
 cancelMidtransOrder
};
