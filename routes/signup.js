const express = require('express');

const signUpController = require("../controller/signUpController")

const router = express.Router();

router.get("/", signUpController.getSignUpPage);

router.post("/user/signup",signUpController.userSingIn)

module.exports = router;