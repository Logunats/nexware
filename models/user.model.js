const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        dob: { type: Date, required: true },
        profilePicture: { type: String },
    }, {
        timestamps: true
    },
)

module.exports = mongoose.model('Users', userSchema, 'Users');
