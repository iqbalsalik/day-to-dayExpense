const express = require("express");

const router = express.Router();

const userAuthentication = require("../authorization/auth");
const recordsController = require("../controller/allRecordController");

router.get("/expensePage/allMonthlyExpense",userAuthentication.userAuthentication,recordsController.getMonthlyRecord);

router.get("/expensePage/download",userAuthentication.userAuthentication,recordsController.downloadMonthlyData);

router.get("/expensePage/showDownloads",userAuthentication.userAuthentication,recordsController.showPrevDownloads);

router.post("/expensePage/addNotes",userAuthentication.userAuthentication,recordsController.addNotes);

router.get("/expensePage/allNotes",userAuthentication.userAuthentication,recordsController.getAllNotes);

router.delete("/expensePage/deleteNote/:id",userAuthentication.userAuthentication,recordsController.deleteNote);

module.exports = router