const path = require("path");

const Users = require("../models/signupModel");

exports.getSignUpPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "signUp.html"))
};

exports.userSingIn = async (req, res) => {
    try{
        const userDetails = {
            name: req.body.name,
            emailId: req.body.emailId,
            password: req.body.password
        }
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
            await Users.create({
                name: req.body.name,
                emailId: req.body.emailId,
                password: req.body.password
            });
            res.status(200).json({
                name: req.body.name,
                emailId: req.body.emailId
            })
        } 
    } catch (err){
        res.status(500).json("Something Went Wrong!!")
    }
    
}