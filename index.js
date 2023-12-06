const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//rota publica
app.get('/', (req, res) => {
  res.json({ message: 'Oi, tudo bem com você?' });
});

//rota privada
app.get("/user/:id", async (req, res) => {
  const id = req.params.id
  //user existe
  const user = await User.findById(id, '-password')
  if (!user) {
    return res.status(404).json({ msg: "user nao encontrado" })
  }

  res.status(200).json({ user })

})


//rota product
const ProductRouter = require('./backend/routes/ProductRouter.js');
app.use('/Product', ProductRouter);


//rota user
const User = require('./backend/models/user.js')

app.post('/register', async (req, res) => {
  const { name, password } = req.body

  //validacao
  if (!name) {
    return res.status(422).json({ error: "nome é obrigatorio" })
  }

  if (!password) {
    return res.status(422).json({ error: "senha é obrigatorio" })
  }

  //validacao userExiste
  const nameExiste = await User.findOne({ name: name })
  if (nameExiste) {
    return res.status(400).json({ msg: "Usuario ja existe" })
  }

  //create password
  const salt = await bcrypt.genSalt(12)
  const passhash = await bcrypt.hash(password, salt)

  //create user
  const user = new User({
    name,
    password: passhash
  })

  try {
    await user.save()
    res.status(201).json({ msg: 'user criado com sucesso' })

  } catch (error) {
    console.log(err)
  }

})
//rota longuinho

app.post("/login", async (req, res) => {
  const { name, password } = req.body

  if (!name) {
    return res.status(422).json({ error: "nome é obrigatorio" })
  }

  if (!password) {
    return res.status(422).json({ error: "senha é obrigatorio" })
  }

  //nameJaexiste

  const user = await User.findOne({ name: name })

  if (!user) {
    return res.status(404).json({ msg: "user nao encontrado" })
  }

  //senha valida

  const senhavalida = await bcrypt.compare(password, user.password)

  if (!senhavalida) {
    return res.status(422).json({ msg: "senha invalida" })
  }


  try {
    const secret = process.env.SECRET
    const token = jwt.sign({
      id: user._id,
    },
      secret,
    )

    res.status(200).json({ msg: "autorizacao", token })

  } catch (err) {
    console.log(err)
  }

})



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

