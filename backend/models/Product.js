const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Nome: {
        type: String,
        required: true
    },
    Qnt: {
        type: String,
        required: true,
        min: 0
    },
    Desc: {
        type: String,
        maxlength: 200
    }
});

const Product = mongoose.model('Product', productSchema)


module.exports = Product