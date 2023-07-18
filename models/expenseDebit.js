const Sequelize = require("sequelize");


const sequelize = require("../utils/dataBase");

const Expense = sequelize.define("expense_debit",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    createdDate:Sequelize.INTEGER,
    createdMonth:Sequelize.INTEGER,
    createdYear:Sequelize.INTEGER
})

module.exports = Expense;