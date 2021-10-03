const express = require('express') //imported express
const mongoose = require('mongoose') //imported mongoose
const app = express() //instance of express
require('dotenv').config() //dotenv
const connectDB = require('./db')
const Auth = require('./middleware/auth')

connectDB() //connect db

app.use('/api/users', require('./routes/users'))
app.use('/api/admin', require('./routes/admin'))

app.get('/', Auth, (req, res) => {
    console.log(req.userData)
    res.json({ "msg": "Hello you are authenticated" })
})

app.listen(3000, () => {
    console.log("Server Started on 3000")
})