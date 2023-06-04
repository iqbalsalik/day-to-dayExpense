const express = require("express");

const router = express.Router();

const expDebitController = require("../controller/expenseDebit");

router.post("/expense/debitAmount",expDebitController.addDebitAmount);

router.get("/expensePage/allExpense", expDebitController.getAllExpenseData);

router.delete("/expense/:expId",expDebitController.deleteExpense)

router.get("/expensePage",expDebitController.getExpensePage);

module.exports = router;