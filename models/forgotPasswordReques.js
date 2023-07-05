const Sequeilize = require("sequelize");

const sequelize = require("../utils/dataBase");

const forgotPassword = sequelize.define("forgotPassword",{
    id:{
        type:Sequeilize.UUID,
        allowNull:false,
        primaryKey:true
    },
    isActive:Sequeilize.BOOLEAN
})

module.exports = forgotPassword;