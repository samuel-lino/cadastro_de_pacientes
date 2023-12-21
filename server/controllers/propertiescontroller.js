const properties = require('../models/propertiesdata')

module.exports = {
    
    async create(request, response){
        const {nome, nascimento, cpf, diabetico, hipertenso, sexo, sus, medicamentosdeusocontinuo, dosesdevacina, ultimaconsulta, observacoes} = request.body
        if(!cpf || !nascimento){
            return response.status(400).json({
                error: "dados importantes inconpletos"
                })
        }
        const createproperties = await properties.create({
            nome,
            nascimento,
            cpf,
            diabetico,
            hipertenso,
            sexo,
            sus,
            medicamentosdeusocontinuo,
            dosesdevacina,
            ultimaconsulta,
            observacoes
            })
        return response.json(createproperties)
        },

    async read(request, response){
        const propertieslit = await properties.find()
        return response.json(propertieslit)
    },

    async update(request, response){
        const propertieslit = await properties.find()
        const {index} = request.params
        const newproperties = request.body
        if(!propertieslit[index]){
            return response.status(400).json({
                error: "paciente não encontrado"
                })
        }
        await properties.updateOne(propertieslit[index], newproperties)
        const propertieslist = await properties.find()
        return response.json(propertieslist)

    },

    async delete(request, response){
        const propertieslit = await properties.find()
        const {index} = request.params
        if(!propertieslit[index]){
            return response.status(400).json({
                error: "paciente não encontrado"
                })
        }
        await properties.deleteOne(propertieslit[index])
        const propertieslist = await properties.find()
        return response.json(propertieslist)
    }
}