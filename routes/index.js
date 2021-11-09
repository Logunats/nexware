const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/cart', require('./cart.routes'));

module.exports = router;
