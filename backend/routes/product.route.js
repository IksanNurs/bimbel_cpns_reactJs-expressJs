var express = require('express');
var router = express.Router();
const controller = require('../controller/product.controller.js');
const authentication = require('../middleware/authentication.js');

router.get('/products', authentication("admin, editor, viewer"), controller.getProducts);
router.get('/products/:id', authentication("admin, editor, viewer"), controller.getProductById);
router.put('/products/:id', authentication("admin, editor, viewer"), controller.updateProduct); 
router.post('/products', authentication("admin, editor, viewer"), controller.createProduct); 


module.exports = router;
