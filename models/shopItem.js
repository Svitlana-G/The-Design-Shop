const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shopItemSchema = new Schema({
    ProductName: {
        type: String,
        required: true
    },
    Company: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    ProductLink: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }

}, { timestamps: true })

const ShopItem = mongoose.model('products', shopItemSchema)

module.exports = ShopItem