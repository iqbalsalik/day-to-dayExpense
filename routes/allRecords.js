const express = require("express");

const router = express.Router();

const userAuthentication = require("../authorization/auth");
const recordsController = require("../controller/allRecordController");

router.get("/expensePage/allMonthlyExpense",userAuthentication.userAuthentication,recordsController.getMonthlyRecord);

module.exports = router