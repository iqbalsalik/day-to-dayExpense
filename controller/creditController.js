const creditModel = require("../models/expenseCredit")
const User = require("../models/signupModel");
const sequelize = require("../utils/dataBase");

exports.getAllCredit = async(req,res)=>{
    try{
       const result = await req.user.getExpense_credits();
       res.status(200).json(result)
    }catch(err){
        console.log(err);
        res.status(400).json("Something Went Wrong!!")
    }
}

exports.addCredit = async(req,res)=>{
    let t;
    try {
        console.log(req.body)
        let result
         t = await sequelize.transaction();
        let { category, amount, description,createdDate,createdMonth,createdYear } = req.body;
        result = await req.user.createExpense_credit({
            category: category,
            amount: amount,
            description: description,
            createdDate:createdDate,
            createdMonth:createdMonth,
            createdYear:createdYear
        });
        let totalCredit = req.user.totalCredit;
        const finalAmount = totalCredit+amount;
        await req.user.update({
            totalCredit: finalAmount
        })
        await t.commit();
        res.status(200).json(result)
    } catch (err) {
        await t.rollback()
        console.log(err)
        res.status(400).json("Something Went Wrong!!")
    }
};

exports.deleteCredit = async (req, res) => {
    let t;
    try {
        // console.log(req.user.totalCredit)
        t = await sequelize.transaction();
        const item = await creditModel.findByPk(req.params.expId);
        let amount = item.amount
        await item.destroy({transaction:t});
        let totalExpense = req.user.totalCredit - amount;
        await req.user.update({
            totalCredit: totalExpense
        },{transaction:t});
        await t.commit()
        res.status(200).json("Successfully Deleted!")
    } catch (err) {
        await t.rollback()
        console.log(err)
        res.status(400).json("Something Went Wrong!")
    }
}

