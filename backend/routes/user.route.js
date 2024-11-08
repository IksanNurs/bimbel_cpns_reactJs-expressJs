var express = require('express');
var router = express.Router();
const controller = require('../controller/user.controller.js');
const authentication = require('../middleware/authentication.js');

router.get('/users', authentication("admin, editor"), controller.getUsers);
router.get('/users/:id', authentication("admin, editor"), controller.getUserById);
router.put('/users/:id', authentication("admin"), controller.updateUser); 


module.exports = router;
