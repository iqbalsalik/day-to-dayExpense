const Sequelize = require("sequelize");

const sequelize = require("../utils/dataBase");

const Users = sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    emailId:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports= Users;