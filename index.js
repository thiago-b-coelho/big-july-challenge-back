const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const userModel = require('./src/models/user.model')

const app = express();
app.use(express.json());

app.use(cors())

app.post('/login', async (req, res) => {
  if (!req.body.username) return res.status(400).json({ message: 'Username field cannot be empty' })
  if (!req.body.password) return res.status(400).json({ message: 'Password field cannot be empty' })

  const userExists = await userModel.findOne({ email: req.body.username })
  if (!userExists) return res.status(400).json({ message: 'User not found' })

  const checkedPass = bcrypt.compareSync(req.body.password, userExists.password)

  if (!checkedPass) return res.status(400).json({ message: "Username or password incorrect" })

  const token = jwt.sign({ _id: userExists.id }, 'shh');


  return res.status(200).json({ message: 'Login successfull', token })
})

app.get('/users', async (req, res) => {
  const usuarios = await usuarioModel.find({})
  return res.status(200).json(usuarios);
})

app.post('/users', async (req, res) => {
  if (!req.body.username) return res.status(400).json({ message: 'Username field cannot be empty!' })
  if (!req.body.password) return res.status(400).json({ message: 'Password field cannot be empty!' })

  const userExists = await userModel.findOne({ email: req.body.username })
  if (userExists.length) return res.status(400).json({ message: 'User already exists' })

  const encryptedPass = bcrypt.hashSync(req.body.password, 10)
  const user = await userModel.create({
    username: req.body.username,
    password: encryptedPass
  })
  return res.status(201).json(user);
})

app.listen(8080, () => {
  console.log('Server running on port 8080')
})