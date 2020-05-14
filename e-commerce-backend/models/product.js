const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlengh: 32,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        maxlengh: 2000,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    quantity: {
        type: Number
    },
    shipping: {
        required: false,
        type: Boolean,
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema)