const router = require('express').Router()
const Person = require('../models/Person');

//create
router.post('/', async (req, res) => {
    const { nome, idade, aprovado } = req.body;  
    
    const erro = validarPessoa({ nome, idade, aprovado });
    if (erro) {
        res.status(400).json({ error: erro });
    }

    try {
        const novapessoa = await Person.create({ nome, idade, aprovado });
        res.status(201).json({ message: 'Pessoa inserida com sucesso 👌' });
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
});

//read 
router.get('/', async (req, res) => {
    try{ 
        const people = await Person.find()
        res.status(200).json({people})
    }
    catch(error){
        res.status(500).json({ error })
    }

})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {    
        const person = await Person.findOne({_id: id});
        if (!person) {
            return res.status(404).json({ error: 'Pessoa não encontrada.' });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//update 
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, idade, aprovado } = req.body;

    const erro = validarPessoa({ nome, idade, aprovado });
    if (erro) {
        res.status(400).json({ error: erro });
    }

    // Valida se pessoa a ser editada existe
    const person = await Person.findOne({_id: id});
    if (!person) {
        return res.status(404).json({ error: 'Pessoa a ser atualizada não encontrada.' });
    }

    try {
        const updatedPerson = await Person.updateOne(
            { _id: id },
            { nome, idade, aprovado },
            { new: true } 
        );

        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedPerson = await Person.findOneAndDelete({ _id: id });

        if (!deletedPerson) {
            return res.status(404).json({ error: 'Pessoa não encontrada.' });
        }

        res.status(200).json({ message: 'Pessoa removida com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Valida as informações de objeto Person.
 * @param {Person} p - Pessoa a ser validada.
 * @returns {string | null} - retorna null se pessoa for válida, ou uma
 * mensagem de erro caso contrário.
 */
function validarPessoa(p) {
    if (p.nome.length === 0 || p.nome.length > 100) 
        return "Nome deve conter entre 1 e 100 caracteres.";
    if (p.idade < 0 || p.idade > 150)
        return "Idade inválida.";
    if (p.aprovado == null)
        return "Atributo 'aprovado' não pode ser nulo.";

    return null
}

module.exports = router