const express = require('express')

const router = express.Router();

const propertiescontroller = require('./controllers/propertiescontroller')

router.get('/pacientes', propertiescontroller.read)
router.post('/pacientes', propertiescontroller.create)
router.put('/pacientes/:id', propertiescontroller.update)
router.delete('/pacientes/:id', propertiescontroller.delete)
router.get('/', (request, response)=>{
    return response.json({
        nome: "Samuel Eduardo",
        cpf: '115.237.264-58'
    })
})

module.exports = router