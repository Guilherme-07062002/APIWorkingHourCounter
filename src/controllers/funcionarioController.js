const funcionario = require('../models/funcionarioModel')

module.exports = {
    async mensagem(request, response){
        try{
            response.status(200).json('Conexão bem sucedida.')
        }catch(error){
            response.status(400).send(error)
        }
    }
}