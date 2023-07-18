const path = require("path");

const bcrypt = require("bcrypt");


const Users = require("../models/signupModel");
const RecordServices = require("../Services/recordServices");

exports.getSignUpPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "signUp.html"))
};

exports.userSingUp = async (req, res) => {
    try{
        const password = req.body.password;
        let allUserEmail = await RecordServices.findAllUsers()
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
                   return res.status(401).json("Something Went Wrong!")
                   
                }
                await RecordServices.createUser(req,hash)
                return res.status(200).json("Successfully Singed UP!!")
            })
        } 
    } catch (err){
        console.log(err)
        res.status(500).json("Something Went Wrong!!")
    }
    
}