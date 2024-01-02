const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // permite acesso de qualquer origem
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const cors = require('cors');
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rota publica
app.get('/', (req, res) => {
  res.json({ message: 'Oi, tudo bem com você?' });
});


//rota product
const ProductRouter = require('./backend/routes/ProductRouter.js');
app.use('/Product', ProductRouter);



app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor no ar 😎', `${process.env.PORT}`);
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

