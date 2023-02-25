const Funcionario = require('../models/funcionarioModel')
const Horario = require('../models/horarioModel')
const jwt = require('jsonwebtoken')

const SECRET = 'secret'

const blacklist = []

module.exports = {
    async autenticate(request, response) {
        try {
            const nome = request.body.nome;
            const senha = request.body.senha;
            const usuario = await Funcionario.findOne({ where: { nome, senha } });
            if (!usuario) {
                return response.status(401).json("Falha na autenticação.");
            } else {
                if (request.body.nome == usuario.nome && request.body.senha == usuario.senha) {
                    const token = jwt.sign({ userId: usuario.id }, SECRET, { expiresIn: 300 })
                    return response.json({ auth: true, token })
                }
            }
        } catch (error) {
            console.log(error)
            response.status(400).send(error)
        }
    },
    async verifyJWT(request, response, next) {
        const token = request.headers['x-access-token']
        const index = blacklist.findIndex(item => item === token)
        if (index !== -1) return response.status(401).end()
        jwt.verify(token, SECRET, (error, decoded) => {
            if (error) return response.status(401).end();

            console.log('Necessário realizar autenticação')
            request.userId = decoded.userId
            next()
        })
    },
    async logout(request, response) {
        console.log('Usuário fez logout.')
        blacklist.push(request.headers['x-access-token'])
        response.end()
    },
    async cadastrarFuncionario(request, response) {
        try {
            const funcionario = request.body.nome
            const senha = request.body.senha
            Funcionario.create({ nome: funcionario, senha: senha })
            response.status(200).json('Funcionário cadastrado com sucesso.')
        } catch (error) {
            response.status(400).send(error)
        }
    },
    async listarFuncionarios(request, response) {
        try {
            const funcionarios = await Funcionario.findAll()
            response.status(200).json(funcionarios)
        } catch (error) {
            response.status(400).send(error)
        }
    },
    async registrarInicio(request, response) {
        try {
            Horario.create()
            response.status(200).json('Horário de Inicio registrado')
        } catch (error) {
            response.status(400).send(error)
        }
    }
}