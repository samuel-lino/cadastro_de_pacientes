const express = require('express')
const app = express()
const router = require('./router')
require('./config/db')
app.use(express.json())
app.use(router)



app.listen(3333)