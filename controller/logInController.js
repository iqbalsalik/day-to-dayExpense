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
        let emailCheck = false;
        Array.from(allUserEmail).forEach(user => {
            if (user.emailId === emailId) {
                emailCheck = true;
                bcrypt.compare(password, user.password, (err, isMatched) => {
                    if (isMatched) {
                        res.status(200).json("succesfully LogedIn")
                    }else{
                        res.status(401).json("Wrong Password!")
                    }
                })
            }
        })
        if(!emailCheck){
            res.status(404).json("User Not Found!!")
        }
    } catch (err) {
        console.log(err)
    }
}