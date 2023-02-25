const Sequelize = require('sequelize')
sequelize = new Sequelize("bd", "gui", "12345", {
    dialect: "sqlite",
    host: "dev.sqlite"
})
module.exports = sequelize