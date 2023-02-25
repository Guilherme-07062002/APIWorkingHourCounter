const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Funcionario extends Model { }

Funcionario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "funcionario",
        timestamps: false
    }
)
module.exports = Funcionario