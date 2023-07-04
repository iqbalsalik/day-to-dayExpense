const Sequelize = require("sequelize");
const sequelize = require("../utils/dataBase");

const fPassword = sequelize.define("fPassword",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    vCode:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports = fPassword