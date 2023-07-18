const Sequelize = require("sequelize");


const sequelize = require("../utils/dataBase");

const notes = sequelize.define("note",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    note:Sequelize.TEXT,
    date:Sequelize.INTEGER,
    month:Sequelize.STRING,
    year:Sequelize.INTEGER,
    day:Sequelize.STRING
})

module.exports = notes;