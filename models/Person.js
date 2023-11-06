const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    nome: String,
    idade: Number, 
    aprovado: Boolean,
})

module.exports = Person