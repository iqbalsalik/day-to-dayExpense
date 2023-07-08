const express = require("express");

const router = express.Router();

const authorization = require("../authorization/auth");
const navigationController = require("../controller/navigationController");

router.get("/toDoPage",navigationController.todoNavigation);

router.get("/dailyPage",navigationController.dailyNavigation);

router.get("/monthlyPage",navigationController.monthlyNavigation);

router.get("/yearlyPage",navigationController.yearlyNavigation);

module.exports = router;