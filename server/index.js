const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router')

require('./config/db')
app.use(express.json())
app.use(cors())

app.use(router)
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*'); // ou '*' para permitir de qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()})



app.listen(3333)