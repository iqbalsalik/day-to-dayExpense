const express = require('express');


const router = express.Router();

const userAuthentication = require("../authorization/auth");
const purchaseController = require("../controller/purchaseController");

router.get("/premiummembership",userAuthentication.userAuthentication,purchaseController.buyPremium);

router.post("/updateTransactionStatus",userAuthentication.userAuthentication,purchaseController.updateTransactionStatus)

router.post("/updateFailureTransactionStatus",userAuthentication.userAuthentication,purchaseController.updateFailureTransactionStatus)
module.exports = router;