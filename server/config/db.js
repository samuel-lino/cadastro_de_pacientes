const mongoose = require('mongoose')

const db = 'mongodb+srv://Cadpaciente:Cadpaciente/@cadastros.raucuy7.mongodb.net/?retryWrites=true&w=majority'


const connect = mongoose.connect(db);

module.exports = connect