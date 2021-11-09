const cartModel = require('../models/cart.model');
const responseMessage = require('../middlewares/responseMessages');
const cartValidation = require('../validation/user');

exports.getCarts = async (req, res) => {
    try {
        const cartFindResp = await cartModel.find({loginId: req.jwt.user});
        return res.status(200).json({
            success: true,
            data: {
                cart: cartFindResp
            }
        });
    } catch(error) {
        return res.status(503).json({
            success: false,
            message: responseMessage[1005],
        });
    }
}

exports.getCartsById = async (req, res) => {
    try {
        const cartFindResp = await cartModel.findById(req.params.id);
        if(cartFindResp) {
            return res.status(200).json({
                success: true,
                data: {
                    cart: cartFindResp
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: responseMessage[1006],
            });
        }
    } catch(error) {
        return res.status(503).json({
            success: false,
            message: responseMessage[1005],
        });
    }
}

exports.saveCarts = async (req, res) => {
    try {
        const schemaValidate = await cartValidation.createCart.validate(req.body);
        if(schemaValidate.error) {
            return res.status(400).json({
                success: false,
                message: schemaValidate.error.details[0].message,
            });
        }
        const cartFindResp = await cartModel.findOne({email: req.body.email, phoneNumber: req.body.phoneNumber});
        if(cartFindResp) {
            return res.status(400).json({
                success: false,
                message: responseMessage[1007],
            });
        } else {
            req.body.loginId = req.jwt.user;
            req.body.profile = req.file.filename;
            const saveResp = await cartModel.create(req.body);
            return res.status(200).json({
                success: true,
                data: {
                    cart: saveResp
                },
                message: responseMessage[1008],
            });
        }
    } catch(error) {
        return res.status(503).json({
            message: responseMessage[1005],
        });
    }
}

exports.updateCarts = async (req, res) => {
    try {
        const schemaValidate = await cartValidation.createCart.validate(req.body);
        if(schemaValidate.error) {
            return res.status(400).json({
                success: false,
                message: schemaValidate.error.details[0].message,
            });
        }
        const cartFindResp = await cartModel.findById(req.params.id);
        if(!cartFindResp) {
            return res.status(404).json({
                success: false,
                message: responseMessage[1006],
            });
        } else {
            if(req.file) {
                req.body.profile = req.file.filename;
            }
            const updateResp = await cartModel.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                data: {
                    cart: updateResp
                },
                message: responseMessage[1009],
            });
        }
    } catch(error) {
        return res.status(503).json({
            message: responseMessage[1005],
        });
    }
}

exports.deleteCarts = async (req, res) => {
    try {
        const cartFindResp = await cartModel.findById(req.params.id);
        if(!cartFindResp) {
            return res.status(404).json({
                success: false,
                message: responseMessage[1006],
            });
        } else {
            await cartModel.findByIdAndRemove(req.params.id);
            return res.status(200).json({
                success: true,
                message: responseMessage[1010],
            });
        }
    } catch(error) {
        return res.status(503).json({
            message: responseMessage[1005],
        });
    }
}