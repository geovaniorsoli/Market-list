const router = require('express').Router()
const Product = require('../models/Product.js')

const validarProduct = (product) => {
    if (!product.Nome || !product.Qnt) {
        return "Nome e quantidade são obrigatórios"
    }
    if (product.Qnt < 0) {
        return "Quantidade não pode ser negativa"
    }
    return null
}

// Criação de produto
router.post('/', async (req, res) => {
    const { Nome, Qnt, Desc} = req.body
    
    const erro = validarProduct({ Nome, Qnt, Desc })
    if (erro) {
        return res.status(400).json({ error: erro })
    }

    try {
        const newProduct = await Product.create({ Nome, Qnt, Desc})
        res.status(201).json({ message: 'Produto inserido com sucesso 👌' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Listar todos os produtos
router.get('/', async (req, res) => {
    try { 
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Obter um produto pelo ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    
    try {    
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Atualizar um produto
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const { Nome, Qnt, Desc} = req.body

    const erro = validarProduct({ Nome, Qnt, Desc})
    if (erro) {
        return res.status(400).json({ error: erro })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { Nome, Qnt, Desc},
            { new: true } 
        )

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Produto a ser atualizado não encontrado.' })
        }

        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Deletar um produto
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Produto não encontrado.' })
        }

        res.status(200).json({ message: 'Produto removido com sucesso.' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
