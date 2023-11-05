const mongoose = require('mongoose');
const express = require('express');
const Person = require('./modules/Person');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.post('/person', async (req, res) => {
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

app.listen(process.env.PORT || 3000, () => { 
  console.log('Servidor no ar 😎');
});

app.get('/', (req, res) => {
  res.json({ message: 'Oi, tudo bem com você?' });
});

const BD_USER = process.env.DB_USER;
const BD_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${BD_USER}:${BD_PASSWORD}@cluster0.emkcr5l.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err);
  });
