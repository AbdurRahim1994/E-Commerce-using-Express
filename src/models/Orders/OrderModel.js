const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },

    customerEmail: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    products: {
        type: Array,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const OrderModel = mongoose.model('orders', orderSchema)
module.exports = OrderModel