const express = require('express')

const router = express.Router();

const propertiescontroller = require('./controllers/propertiescontroller')

router.get('/pacientes', propertiescontroller.read)
router.post('/pacientes', propertiescontroller.create)
router.put('/pacientes/:index', propertiescontroller.update)
router.delete('/pacientes/:index', propertiescontroller.delete)
router.get('/', (request, response)=>{
    return response.json({
        nome: "Samuel Eduardo",
        cpf: '115.237.264-58'
    })
})

module.exports = router