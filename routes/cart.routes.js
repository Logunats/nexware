const express = require('express');
const cartController = require('../controllers/cart.ctrl');
const middleware = require('../middlewares/auth')
const fileMiddleware = require('../middlewares/upload');

const router = express.Router();

router.get('/', middleware.isAuthorised, cartController.getCarts);
router.get('/:id', middleware.isAuthorised, cartController.getCartsById);
router.post('/',   middleware.isAuthorised,fileMiddleware.upload, cartController.saveCarts);
router.put('/:id',  middleware.isAuthorised, fileMiddleware.upload, cartController.updateCarts);
router.delete('/:id', middleware.isAuthorised, cartController.deleteCarts);

module.exports = router;
