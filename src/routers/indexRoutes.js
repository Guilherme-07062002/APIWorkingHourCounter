const express = require('express')
const { cadastrarFuncionario } = require('../controllers/funcionarioController')
const router = express.Router()

router.route('/register').post(cadastrarFuncionario)

module.exports = router