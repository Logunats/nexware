const express = require('express');
const fileMiddleware = require('../middlewares/upload');
const userController = require('../controllers/user.ctrl');

const router = express.Router();

router.post('/', fileMiddleware.upload, userController.saveUser);

module.exports = router;
