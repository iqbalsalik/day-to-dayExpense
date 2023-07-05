const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/router");
const expDebitRouter = require("./routes/expDebitRouter");
const purchaseRouter = require("./routes/purchase");
const premiumRouter = require("./routes/premium");

const sequelize = require("./utils/dataBase");


const User = require("./models/signupModel");
const Expense = require("./models/expenseDebit");
const Order = require("./models/order");
const ForgotPass = require("./models/forgotPasswordReques");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"))

app.use(expDebitRouter);
app.use(router);
app.use(purchaseRouter);
app.use(premiumRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPass);
ForgotPass.belongsTo(User);



sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})
