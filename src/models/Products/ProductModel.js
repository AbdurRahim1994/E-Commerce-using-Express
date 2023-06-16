const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })

const ProductModel = mongoose.model('products', productSchema)
module.exports = ProductModel;