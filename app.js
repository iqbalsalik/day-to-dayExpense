const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/router");
const expDebitRouter = require("./routes/expDebitRouter");
const purchaseRouter = require("./routes/purchase");
const premiumRouter = require("./routes/premium");
const navigationRouter = require("./routes/navigationRouter");
const creditRouter = require("./routes/creditRouter");
const allRecordsRouter = require("./routes/allRecords");

const sequelize = require("./utils/dataBase");


const User = require("./models/signupModel");
const Expense = require("./models/expenseDebit");
const Order = require("./models/order");
const ForgotPass = require("./models/forgotPasswordReques");
const ExpenseCredit = require("./models/expenseCredit");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"))

app.use(expDebitRouter);
app.use(router);
app.use(purchaseRouter);
app.use(premiumRouter);
app.use(navigationRouter);
app.use(creditRouter);
app.use(allRecordsRouter)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPass);
ForgotPass.belongsTo(User);

User.hasMany(ExpenseCredit);
ExpenseCredit.belongsTo(User)



sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})
