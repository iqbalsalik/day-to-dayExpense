const jwt = require("jsonwebtoken");
const User = require("../models/signupModel");

const userAuthentication = async(req,res,next)=>{
    try{
        const token = req.header("authorization");
        const authUser = jwt.verify(token,"afdsjn2234lkkljasjfdlJKlkjsdf:LKfda232l3kdfsakjhdfanmJKHadsfnKJLHdfJkjsdfhjfa");
        const user = await User.findByPk(authUser.userId);
        req.user= user;
        next()
    }catch(err){
        res.status(404).json("User Not Found!!")
    }
}

module.exports = {userAuthentication};