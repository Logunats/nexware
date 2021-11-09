const Joi = require('joi');

const signup = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    dob: Joi.date().required(),
});

const login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
});

const createCart = Joi.object().keys({
    email: Joi.string().email().required(),
    cartId: Joi.string().required(),
    userName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    cartDateTime: Joi.date().required(),
});

module.exports = {
    signup,
    login,
    createCart
}