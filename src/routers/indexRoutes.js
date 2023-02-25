const express = require('express')
const { cadastrarFuncionario, listarFuncionarios, verifyJWT, autenticate } = require('../controllers/funcionarioController')
const router = express.Router()

// Registrar
router.route('/register').post(cadastrarFuncionario)
// Login
router.route('/auth').get(autenticate)

router.route('/list').get(verifyJWT, listarFuncionarios)

module.exports = router