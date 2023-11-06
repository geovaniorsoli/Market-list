const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rota
const PessoaRota = require('./routes/PessoaRota')
app.use('/Person', PessoaRota)

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
