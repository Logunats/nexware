const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const config = require('../config');
const responseMessage = require('../middlewares/responseMessages');
const inputValidation = require('../validation/user');

exports.login = async (req, res) => {
    try {
        const schemaValidate = await inputValidation.login.validate(req.body);
        if(schemaValidate.error) {
            return res.status(400).json({
                success: false,
                message: schemaValidate.error.details[0].message,
            });
        }
        if(req.body.email && req.body.password) {
            const userFindResp = await userModel.findOne({email: req.body.email});
            if(userFindResp) {
                const passwordStatus = await bcrypt.compare(req.body.password, userFindResp.password);
                if(passwordStatus) {
					const token = jwt.sign({user: userFindResp._id}, config.jwtSecretKey);
                    return res.status(201).json({
                        success: true,
                        data: {
                            token
                        },
                        message: responseMessage[1001],
                    })
                }
            }
        }
        return res.status(401).json({
            message: responseMessage[1002],
        });
    } catch(error) {
        return res.status(401).json({
            message: responseMessage[1003],
        });
    }
}

exports.getById = async (id) => {
    try {
        const userFindResp = await userModel.findById(id);
        return userFindResp;
    } catch(error) {
        return null;
    }
}
