const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/router");
const expDebitRouter = require("./routes/expDebitRouter");
const sequelize = require("./utils/dataBase");
const User = require("./models/signupModel");
const Expense = require("./models/expenseDebit");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"))

app.use(expDebitRouter);
app.use(router);

User.hasMany(Expense);
Expense.belongsTo(User);


sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})
