const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.SEQUELIZE_TABLE_NAME, process.env.SEQUELIZE_USERNAME, process.env.SEQUELIZE_PASSWORD, {
    dialect: "mysql",
    host: process.env.SEQUELIZE_HOST
});

module.exports = sequelize;