const Sequelize = require("sequelize");

const sequelize = require("../utils/dataBase");

const downloads = sequelize.define("download",{
    
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    date:Sequelize.STRING,
    fileUrl:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = downloads;