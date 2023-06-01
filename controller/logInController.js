const path = require("path");

const Users = require("../models/signupModel");

exports.getLogInPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"))
};

exports.postLogInUser = async(req,res)=>{
try{
let emailId = req.body.emailId;
let password = req.body.password;
let allUserEmail = await Users.findAll();
let passwordCheck = false;
let emailCheck = false;
Array.from(allUserEmail).forEach(user=>{
    if(user.emailId ===emailId && user.password === password){
        passwordCheck = true;
        emailCheck = true;
    }else if(user.emailId === emailId && user.password!=password){
        emailCheck = true;
    }else if(user.emailCheck!=emailId && user.password === password){
        passwordCheck = true;
    }
})
if(passwordCheck && emailCheck){
    res.status(200).json("User LogIn Successfully!")
}else if(!emailCheck){
    res.status(404).json("User Not Found!")
}else if(!passwordCheck){
    res.status(400).json("Wrong Password!")
}
}catch(err){
    console.log(err)
}
}