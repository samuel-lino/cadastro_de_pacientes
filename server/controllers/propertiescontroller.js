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
        const {id} = request.params
        const newproperties = request.body
        const props = await properties.findByIdAndUpdate({_id: id}, newproperties)
        if(!props){
            return response.status(400).json({
                error: "paciente não encontrado"
                })
        }
        return response.json(props)

    },

    async delete(request, response){
        const {id} = request.params;
        const props = await properties.findByIdAndDelete({ _id : id });
        if(!props){
            return response.status(401).json({
                error: "paciente não encontrado"
            })
        }
        return response.json(props)
        
    }
}