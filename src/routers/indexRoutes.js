const express = require('express')
const { mensagem } = require('../controllers/funcionarioController')
const router = express.Router()

router.route('/').get(mensagem)

module.exports = router