const sequelize = require("../utils/dataBase");
const expense = require("../models/expenseDebit");
const credit = require("../models/expenseCredit");
const User = require("../models/signupModel");

exports.getMonthlyRecord = async(req,res)=>{
    let t;
    try{
        t =await sequelize.transaction();
        const result = await User.findByPk(req.user.id,{
            include:[credit,expense]
        },{transaction:t})
       await t.commit()
       res.status(200).json({
        result
       })

    }catch(err){
       await t.rollback()
        console.log(err)
    }
}