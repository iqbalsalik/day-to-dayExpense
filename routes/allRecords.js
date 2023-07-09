const express = require("express");

const router = express.Router();

const userAuthentication = require("../authorization/auth");
const recordsController = require("../controller/allRecordController");

router.get("/expensePage/allMonthlyExpense",userAuthentication.userAuthentication,recordsController.getMonthlyRecord);

router.get("/expensePage/download",userAuthentication.userAuthentication,recordsController.downloadMonthlyData);

router.get("/expensePage/showDownloads",userAuthentication.userAuthentication,recordsController.showPrevDownloads)

module.exports = router