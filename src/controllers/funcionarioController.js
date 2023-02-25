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
                if (nome == usuario.nome && senha == usuario.senha) {
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

            // console.log('Necessário realizar autenticação')
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
        const token = request.headers['x-access-token']
        const decoded = jwt.verify(token, SECRET);
        const id = decoded.userId
        const registro = Horario.findAll({ attributes: ['inicio'], where: { id_funcionario: id } })
        if ((await registro).length > 0) {
            response.status(200).json('Usuário já registrou horário de inicio hoje.')
        } else if ((await registro).length == 0) {
            try {
                await Horario.create({ id_funcionario: id })
                response.status(200).json('Horário de Inicio registrado.')
            } catch (error) {
                response.status(400).send(error)
            }
        }

    },
    async registrarFim(request, response) {
        const token = request.headers['x-access-token']
        const decoded = jwt.verify(token, SECRET);
        const id = decoded.userId
        const registro = Horario.findAll({ attributes: ['inicio'], where: { id_funcionario: id } })
        if ((await registro).length == 0) {
            response.status(200).json('Usuário ainda não registrou horário de inicio hoje.')
        } else if ((await registro).length == 1) {
            try {
                Horario.update(
                    { fim: sequelize.literal('CURRENT_TIMESTAMP') },
                    { where: { id_funcionario: id } }
                )
                response.status(200).json('Horário de Fim registrado.')
            } catch (error) {
                response.status(400).send(error)
            }
        }
    },
    async obterDuração(request, response) {
        try {
            const token = request.headers['x-access-token']
            const decoded = jwt.verify(token, SECRET);
            const id = decoded.userId
            const registro = await Horario.findOne({ where: { id_funcionario: id } })
            const funcionario = await Funcionario.findOne({ where: { id: id } })

            const dataInicio = new Date(registro.inicio);
            const dataFim = new Date(registro.fim);

            const diffEmMS = Math.abs(dataFim - dataInicio); // diferença em milissegundos
            const diffEmMin = Math.floor(diffEmMS / 1000 / 60); // diferença em minutos

            console.log(`O funcionário ${funcionario.nome} trabalhou ${diffEmMin} minutos.`)
            // { auth: true, token }
            response.status(200).json({ minutos: diffEmMin, nome: funcionario.nome })
        } catch (error) {
            response.status(400).send(error)
        }
    }

}