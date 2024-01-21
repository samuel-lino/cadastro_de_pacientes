const mongoose = require('mongoose')

const db = 'mongodb+srv://Cadpaciente:Cadpaciente@cadastros.raucuy7.mongodb.net/pacientes?retryWrites=true&w=majority'


const connect = mongoose.connect(db)

module.exports = connect