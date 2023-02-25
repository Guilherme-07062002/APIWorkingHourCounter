const express = require('express')
const { cadastrarFuncionario, listarFuncionarios, verifyJWT, autenticate, logout, registrarInicio, registrarFim, obterDuração } = require('../controllers/funcionarioController')
const router = express.Router()

router.route('/list').get(verifyJWT, listarFuncionarios)

// Registrar
router.route('/register').post(cadastrarFuncionario)
// Login
router.route('/auth').get(autenticate)
// Logout
router.route('/logout').get(verifyJWT, logout)

// Registrar horário de inicio do expediente
router.route('/record/start').get(verifyJWT, registrarInicio)


// Registrar horário de termino do expediente
router.route('/record/end').get(verifyJWT, registrarFim)


// Obter a duração do expediente daquele funcionário naquele dia
router.route('/working-hours').get(verifyJWT, obterDuração)

module.exports = router