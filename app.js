require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");

const path = require("path");
const fs = require("fs");

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
const Downloads = require("./models/downloads");
const Notes = require("./models/notes");


const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname,"access.log"),{
    flag:"a"
})

app.use(morgan(("combined"),{stream:accessLogStream}))
app.use(compression());
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

User.hasMany(Downloads);
Downloads.belongsTo(User)

User.hasMany(Notes)
Notes.belongsTo(User)


sequelize.sync().then(()=>{
    app.listen(process.env.PORT);
}).catch(err=>{
    console.log(err)
})
