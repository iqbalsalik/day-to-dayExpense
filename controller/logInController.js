const path = require("path");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/signupModel");

function generateToken(id,name){
   return jwt.sign({userId:id,name:name},"afdsjn2234lkkljasjfdlJKlkjsdf:LKfda232l3kdfsakjhdfanmJKHadsfnKJLHdfJkjsdfhjfa");
}

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
                        res.status(200).json({message:"succesfully LogedIn",token:generateToken(user.id,user.name)})
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