const express = require("express");

const userAuthentication = require("../authorization/auth");

const router = express.Router();

const expDebitController = require("../controller/expenseDebit");

router.post("/expense/debitAmount",userAuthentication.userAuthentication,expDebitController.addDebitAmount);

router.get("/expensePage/allExpense",userAuthentication.userAuthentication,expDebitController.getAllExpenseData);

router.delete("/expense/:expId",userAuthentication.userAuthentication,expDebitController.deleteExpense)

router.get("/expensePage",expDebitController.getExpensePage);

module.exports = router;