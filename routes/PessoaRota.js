const router = require('express').Router()
const Person = require('../modules/Person');

//create
router.post('/', async (req, res) => {
    const { nome, idade, aprovado } = req.body;  
    
   if (!nome) {
   return res.status(422).json({ error: "Nome é obrigatório." });
   }

   if (!idade) {
   return res.status(422).json({ error: "Idade é obrigatória." });
   }

   if (aprovado === undefined) {
   return res.status(422).json({ error: "Aprovação é obrigatória." });
   }

 try {
   const novapessoa = await Person.create({ nome, idade, aprovado });
   res.status(201).json({ message: 'Pessoa inserida com sucesso 👌' });
 } catch (error) {
   res.status(500).json({ erro: error.message });  
 }
});

//read 
router.get('/', async (req, res) => {
    try{ 
        const people = await Person.find()
        res.status(200).json({people})
    }
    catch(error){
        res.status(500).json({error: erro})
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
        res.status(500).json({ error: erro });
    }
});

//update 
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, idade, aprovado } = req.body;

    try {
        const updatedPerson = await Person.updateOne(
            { _id: id },
            { nome, idade, aprovado },
            { new: true } 
        );

        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({ error: erro });
    }
});



module.exports = router