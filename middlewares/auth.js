const jwt = require('jsonwebtoken');
const config = require('../config');
const responseMessage = require('./responseMessages');
const authController = require('../controllers/auth.ctrl');

exports.isAuthorised = async (req, res, next) => {
    try {
        if (req.headers['authorization']) {
            const authorization = req.headers['authorization'].split(' ');
            if ((authorization.length > 1) && (authorization[0] === 'Bearer')) {
                req.jwt = jwt.verify(authorization[1], config.jwtSecretKey);
                const user = await authController.getById(req.jwt.user);
                if(user) {
                    return next();
                }
            }
        }
        return res.status(401).json({
            message: responseMessage[1004],
        });
    } catch (error) {
        return res.status(403).json({
            message: responseMessage[1004],
        });
    }
};