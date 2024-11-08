var express = require('express');
var router = express.Router();
const controller = require('../controller/midtrans_notification.controller.js');
const authentication = require('../middleware/authentication.js');

router.post('/midtrans/notification', controller.createMidtransNotification);
router.get('/midtrans/finish', controller.getMidtransFinish);
router.get('/midtrans/unfinish', controller.getMidtransUnfinish);
router.get('/midtrans/error', controller.getMidtransError);
router.put('/midtrans/cancel/:id', controller.cancelMidtransOrder);
router.get('/midtrans/status', controller.getMidtransOrderStatus);
module.exports = router;
