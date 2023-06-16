const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        default: 0
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;