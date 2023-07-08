const express = require('express');

const signUpController = require("../controller/signUpController");
const logInController = require("../controller/logInController");

const router = express.Router();

router.post("/logIn",logInController.postLogInUser)

router.get("/logIn", logInController.getLogInPage)

router.post("/user/signup",signUpController.userSingUp);

router.post("/password/forgotpassword",logInController.forgotPassword)

// router.post("/password/verifyPassword",logInController.verifyCode);

router.post("/password/updatepassword/:resetpasswordid",logInController.updatePassword)

router.get("/password/resetpassword/:id",logInController.verifyCode)

router.get("/", signUpController.getSignUpPage);

module.exports = router;