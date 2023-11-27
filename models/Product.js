const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true
    },
    Qnt: {
        type: Number,
        required: true,
        min: 0
    }
});

const Product = mongoose.model('Product', productSchema)


module.exports = Product