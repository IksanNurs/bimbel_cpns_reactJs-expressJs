var express = require('express');
var router = express.Router();
const controller = require('../controller/order.controller.js');
const authentication = require('../middleware/authentication.js');

router.get('/orders', authentication("admin, editor, viewer"), controller.getOrders);
router.get('/orders/:id', authentication("admin, editor, viewer"), controller.getOrderById);
router.put('/orders/:id', authentication("admin, editor, viewer"), controller.updateOrder); 
router.post('/orders', authentication("admin, editor, viewer"), controller.createOrder); 


module.exports = router;
