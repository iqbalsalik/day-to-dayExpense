const Sequelize = require("sequelize");


const sequelize = require("../utils/dataBase");

const Order = sequelize.define("order",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING
})

module.exports = Order;