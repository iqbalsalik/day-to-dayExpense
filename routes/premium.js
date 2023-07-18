const express = require("express");


const router = express.Router();

const authorization = require("../authorization/auth");
const premiumController = require("../controller/premiumController");

router.get("/premium/getLeaderboard",authorization.userAuthentication,premiumController.getLeaderboard);

module.exports = router;