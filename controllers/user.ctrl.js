const userModel = require('../models/user.model');
const responseMessage = require('../middlewares/responseMessages');
const bcrypt = require('bcryptjs');
const config = require('../config');
const userValidation = require('../validation/user');

exports.saveUser = async (req, res) => {
    try {
        const schemaValidate = await userValidation.signup.validate(req.body);
        if(schemaValidate.error) {
            return res.status(400).json({
                success: false,
                message: schemaValidate.error.details[0].message,
            });
        }
        req.body.password = await bcrypt.hash(req.body.password, parseInt(config.saltRounds));
        req.body.profilePicture = req.file.filename;
        const userFindResp = await userModel.findOne({email: req.body.email});
        if(userFindResp) {
            return res.status(401).json({
                success: false,
                message: responseMessage[1007],
            });
        } else {
            // req.body.loginId = req.jwt.user;
            const saveResp = await userModel.create(req.body);
            return res.status(200).json({
                success: true,
                data: {
                    user: saveResp
                },
                message: responseMessage[1008],
            });
        }
    } catch(error) {
        console.log(error)
        return res.status(401).json({
            message: responseMessage[1005],
        });
    }
}
