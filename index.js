const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rota
const ProductRouter = require('./routes/ProductRouter.js');
app.use('/Product', ProductRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Oi, tudo bem com você?' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor no ar 😎');
});


const BD_USER = process.env.USER
const BD_PASSWORD = process.env.PASSWORD

console.log(BD_USER)
console.log(BD_PASSWORD)
mongoose
  .connect(
    `mongodb+srv://${BD_USER}:${BD_PASSWORD}@cluster0.1umqvma.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('connect certinho');
  })
  .catch((err) => {
    console.error('Error BD', err);
  });
