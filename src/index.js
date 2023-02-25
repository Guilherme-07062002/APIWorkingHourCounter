const express = require('express')
const sequelize = require('./config/database')

const app = express()

sequelize.sync().then(() => console.log("Conexão bem sucedida ao database."));

app.use(express.json())

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.')
})