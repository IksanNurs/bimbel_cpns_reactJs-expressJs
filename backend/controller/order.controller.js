'use strict';
const { Order, Product, User } = require('../models');  // Assuming Order, Product, and User models
const { validationResult } = require('express-validator');  // Validation imports
const { v4: uuidv4 } = require('uuid');  // Mengimpor fungsi uuidv4
const axios = require('axios');




async function getMidtransOrderURL(orderID, amount, useremail, username) {
  const isProduction = process.env.MIDTRANS_ENV === 'production';

  // Tentukan endpoint Midtrans
  const midtransUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

  // Request payload untuk pembayaran
  const paymentRequest = {
    transaction_details: {
      order_id: orderID,  // ID pesanan yang unik
      gross_amount: amount,  // Jumlah untuk transaksi
    },
    customer_details: {
      email: useremail,  // Email pengguna
      first_name: username,  // Nama pengguna
    },
  };

  try {
    // Kirim permintaan POST ke Midtrans API
    const response = await axios.post(midtransUrl, paymentRequest, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64')}`,  // Header otentikasi menggunakan Basic Auth
      },
    });

    // Ambil payment_url dan token dari response
    return {
      paymentUrl: response.data.redirect_url,  // URL untuk melakukan pembayaran
      paymentToken: response.data.token,       // Token pembayaran
    };
  } catch (error) {
    console.error('Error Midtrans API:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create Midtrans payment URL');
  }
}


// Create a new order
const createOrder = async (req, res) => {
    const { product_id } = req.body;  // Only product_id is now required in the request body
    const userId = req.userId;  // Get the user ID from the JWT token (set by the middleware)
    const createdBy = userId;   // User creating the order
    const updatedBy = userId;   // User updating the order (initially the same)
  
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      // Fetch the user to associate with the order
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: `User with ID ${userId} not found` });
      }
  
      // Fetch the product associated with the given product_id
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${product_id} not found` });
      }
  
      // Fetch the price for the product
      const price = product.price;
  
      // Create a unique order UUID
      const orderUUID = `${process.env.MIDTRANS_PREFIX}-${uuidv4()}`;
  
      // Create a new order entry in the database
      const newOrder = await Order.create({
        uuid: orderUUID,
        user_id: userId,
        product_id,  // Use snake_case for product_id field
        amount: price,
        transaction_id: orderUUID,
        created_by: createdBy,
        updated_by: updatedBy,
      });
  
      // Integrate with Midtrans to get the payment URL and token
      const { paymentUrl, paymentToken } = await getMidtransOrderURL(orderUUID, price, user.email, user.username);
  
      // Update the order with the payment URL and token
      await newOrder.update({
        midtrans_payment_url: paymentUrl,
        midtrans_payment_token: paymentToken,
      });
  
      // Return success response with the payment URL and the created order
      res.status(201).json({
        message: 'Order created successfully',
        data: {
          order: newOrder,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the order' });
    }
  };
  
// Get all orders
const getOrders = async (req, res) => {
    const userId = req.userId;
    const userRole = req.userRole; // Assuming role is part of the token payload
  try {
  

    // Basic attributes to retrieve from the orders table
    const orderAttributes = [
      'uuid', 'user_id', 'product_id', 'transaction_id', 'amount', 'is_active',
      'created_at', 'updated_at', 'cancelled_at', 'expired_at', 'checked_out_at',
      'midtrans_payment_token', 'midtrans_payment_url', 'paid_at', 'created_by', 'updated_by'
    ];

    // Start the query
    const queryOptions = {
      attributes: orderAttributes,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price'],
        },
        {
          model: User,
          as: 'created_by_user',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'updated_by_user',
          attributes: ['id', 'name'],
        },
      ],
    };

    // If the role is 'viewer', just retrieve basic orders for the user
    if (userRole === 'viewer') {
      queryOptions.where = {
        user_id: userId, // Only fetch orders related to the current user
      };

    }

  // Fetch orders based on the query options
  const orders = await Order.findAndCountAll(queryOptions);


  // Return the response
  res.status(200).json({
    message: 'Orders retrieved successfully',
    data: orders.rows,
  });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the orders' });
  }
};
  

// Get an order by ID
const getOrderById = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const order = await Order.findOne({
        where: { id: orderId },
        attributes: [
          'uuid',
          'user_id',
          'product_id',
          'transaction_id',
          'amount',
          'is_active',
          'created_at',
          'updated_at',
          'cancelled_at',
          'expired_at',
          'checked_out_at',
          'midtrans_payment_token',
          'midtrans_payment_url',
          'paid_at',
          'created_by',
          'updated_by'
        ],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
          {
            model: Product,
            as: 'product',  // Sesuaikan alias dengan asosiasi
            attributes: ['id', 'name', 'price'],
          },
          {
            model: User,
            as: 'created_by_user',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'updated_by_user',
            attributes: ['id', 'name'],
          },
        ],
      });
  
      if (!order) {
        return res.status(404).json({ message: `Order with ID ${orderId} not found` });
      }
  
      res.status(200).json({
        message: 'Order retrieved successfully',
        data: order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the order' });
    }
  };
  

// Update an order by ID
const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const {
      product_id,
      amount,
      transaction_id,
      cancelled_at,
      is_active,
      expired_at,
      checked_out_at,
      midtrans_payment_token,
      midtrans_payment_url,
      paid_at,
      created_by,
      updated_by,
    } = req.body;
  
    const updatedBy = req.userId;  // Ambil user ID dari JWT token (set oleh middleware)
  
    try {
      // Cari order berdasarkan ID
      const order = await Order.findOne({ where: { id: orderId } });
  
      if (!order) {
        return res.status(404).json({ message: `Order with ID ${orderId} not found` });
      }
  
      // Fetch user untuk mengasosiasikan dengan field updated_by
      const user = await User.findByPk(updatedBy);
      if (!user) {
        return res.status(404).json({ message: `User with ID ${updatedBy} not found` });
      }
  
      // Fetch product untuk mengasosiasikan dengan field product_id
      if (product_id) {
        const product = await Product.findByPk(product_id);
        if (!product) {
          return res.status(404).json({ message: `Product with ID ${product_id} not found` });
        }
      }
  
      // Update atribut order
      order.product_id = product_id !== undefined ? product_id : order.product_id;
      order.amount = amount !== undefined ? amount : order.amount;
      order.transaction_id = transaction_id !== undefined ? transaction_id : order.transaction_id;
      order.cancelled_at = cancelled_at !== undefined ? cancelled_at : order.cancelled_at;
      order.is_active = is_active !== undefined ? is_active : order.is_active;
      order.expired_at = expired_at !== undefined ? expired_at : order.expired_at;
      order.checked_out_at = checked_out_at !== undefined ? checked_out_at : order.checked_out_at;
      order.midtrans_payment_token = midtrans_payment_token !== undefined ? midtrans_payment_token : order.midtrans_payment_token;
      order.midtrans_payment_url = midtrans_payment_url !== undefined ? midtrans_payment_url : order.midtrans_payment_url;
      order.paid_at = paid_at !== undefined ? paid_at : order.paid_at;
      order.created_by = created_by !== undefined ? created_by : order.created_by;
      order.updated_by = updatedBy;  // Pastikan ini adalah user yang sedang mengupdate
  
      // Simpan perubahan ke database
      await order.save();
  
      res.status(200).json({
        message: 'Order updated successfully',
        data: order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the order' });
    }
  };
  

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
};
