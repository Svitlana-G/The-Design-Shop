const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shopItemSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    compagny: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true })

const ShopItem = mongoose.model('shopdata', shopItemSchema)

module.exports = ShopItem