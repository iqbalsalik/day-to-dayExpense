require("dotenv").config();
const Sequelize = require("sequelize");
console.log(process.env.SEQUELIZE_TABLE_NAME,process.env.SEQUELIZE_USERNAME,process.env.SEQUELIZE_PASSWORD,process.env.SEQUELIZE_HOST)

const sequelize = new Sequelize(process.env.SEQUELIZE_TABLE_NAME, process.env.SEQUELIZE_USERNAME, process.env.SEQUELIZE_PASSWORD, {
    dialect: "mysql",
    host: process.env.SEQUELIZE_HOST
});


module.exports = sequelize;
