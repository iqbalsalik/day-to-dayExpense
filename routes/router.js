const express = require('express');

const signUpController = require("../controller/signUpController");
const logInController = require("../controller/logInController");

const router = express.Router();

router.post("/logIn",logInController.postLogInUser)

router.get("/logIn", logInController.getLogInPage)

router.post("/user/signup",signUpController.userSingIn)

router.get("/", signUpController.getSignUpPage);

module.exports = router;