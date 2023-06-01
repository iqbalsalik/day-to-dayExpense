const path = require("path");

const bcrypt = require("bcrypt");

const Users = require("../models/signupModel");

exports.getLogInPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
};

exports.postLogInUser = async (req, res) => {
    try {
        let emailId = req.body.emailId;
        let password = req.body.password;
        let allUserEmail = await Users.findAll();
        const emailCheck = false
        Array.from(allUserEmail).forEach(user => {
            if (user.emailId === emailId) {
                bcrypt.compare(password, user.password, (err, isMatched) => {
                    if (isMatched) {
                        res.status(200).json("User LogIn Successfully!")
                    }else{
                        res.status(401).json("User not authorized")
                    }
                })
            }
        })
        if(!emailCheck){
            res.status(404).json("User Not Found!")
        }
    } catch (err) {
        console.log(err)
    }
}