const express = require('express');


const router = express.Router();

const userAuthentication = require("../authorization/auth");
const creditController = require("../controller/creditController");

router.post("/expense/creditAmount",userAuthentication.userAuthentication,creditController.addCredit);

router.get("/expense/allCredits",userAuthentication.userAuthentication,creditController.getAllCredit);

router.delete("/credit/:expId",userAuthentication.userAuthentication,creditController.deleteCredit)

module.exports = router;