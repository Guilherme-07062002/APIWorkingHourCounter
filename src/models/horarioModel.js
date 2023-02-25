const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Horario extends Model { }

Horario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        inicio: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        fim: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('0')
        },
        id_funcionario: {
            type: DataTypes.INTEGER,
            references: {
                model: 'funcionarios',
                key: 'id',
                onDelete: 'CASCADE'
            },
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "horario",
        timestamps: false
    }
)
module.exports = Horario