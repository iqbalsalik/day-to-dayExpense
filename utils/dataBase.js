const Sequelize = require("sequelize");

const sequelize = new Sequelize("day-to-dayexpense","root","syedashu02",{
    dialect:"mysql",
    host:"localhost"
});

module.exports = sequelize;