const Funcionario = require('../models/funcionarioModel')

module.exports = {
    // async mensagem(request, response){
    //     try{
    //         response.status(200).json('Conexão bem sucedida.')
    //     }catch(error){
    //         response.status(400).send(error)
    //     }
    // }

    async cadastrarFuncionario(request, response){
        try {
            const funcionario = request.body.nome
            Funcionario.create({nome: funcionario})
            response.status(200).json('Funcionário cadastrado com sucesso.')
        } catch (error) {
            response.status(400).send(error)
        }
    }
}