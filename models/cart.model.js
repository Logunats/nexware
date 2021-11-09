const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        cartId: { type: String, required: true },
        userName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        email: { type: String, required: true },
        cartDateTime: { type: Date, required: true },
        items: [],
        profile: { type: String},
        loginId: { type: mongoose.ObjectId, required: true },
    }, {
        timestamps: true
    },
)

module.exports = mongoose.model('Carts', cartSchema, 'Carts');
