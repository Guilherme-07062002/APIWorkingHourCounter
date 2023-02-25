const express = require('express')
const sequelize = require('./config/database')
const Routes = require('./routers/indexRoutes')

const app = express()

sequelize.sync().then(() => console.log("Conexão bem sucedida ao database."));

app.use(express.json())

app.use('', Routes)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.')
})

