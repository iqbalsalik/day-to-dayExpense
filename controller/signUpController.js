const path = require("path");

const bcrypt = require("bcrypt");


const Users = require("../models/signupModel");

exports.getSignUpPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "signUp.html"))
};

exports.userSingUp = async (req, res) => {
    try{
        const password = req.body.password;
        let allUserEmail = await Users.findAll();
        let bool = false;
        Array.from(allUserEmail).forEach(user=>{
            if(user.emailId === req.body.emailId){
                bool = true;
            }
        })
        if(bool){
            res.status(400).json("User Already Exists!")
        }else{
            bcrypt.hash(password,10,async(err, hash)=>{
                if(err){
                    res.status(401).json("Something Went Wrong!")
                }
                await Users.create({
                    name: req.body.name,
                    emailId: req.body.emailId,
                    password: hash
                });
                res.status(200).json({
                    name: req.body.name,
                    emailId: req.body.emailId
                })
            })
        } 
    } catch (err){
        res.status(500).json("Something Went Wrong!!")
    }
    
}