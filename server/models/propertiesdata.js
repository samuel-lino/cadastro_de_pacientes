const mongoose = require('mongoose')

const propertiesshema = new mongoose.Schema({
    nome: String,
    nascimento: String,
    cpf: String,
    diabetico: Boolean,
    hipertenso: Boolean,
    sexo: String,
    sus: String,
    medicamentosdeusocontinuo: Array,
    dosesdevacina: Array,
    ultimaconsulta: String,
    observacoes: String
})

module.exports = mongoose.model('pacientes', propertiesshema)