const path = require("path");

const debitModule = require("../models/expenseDebit");

exports.getExpensePage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","daily.html"))
}

exports.getAllExpenseData = async(req,res)=>{
let result = await req.user.getExpense_debits();
res.status(200).json(result)
}


exports.addDebitAmount = async (req,res)=>{
    try{
        let {category,amount,description} = req.body;
       const result = await req.user.createExpense_debit({
            category:category,
            amount:amount,
            description:description
        })
        res.status(200).json(result)
    }catch(err){
        res.status(400).json("Something Went Wrong!!")
    }
}

exports.deleteExpense = async(req,res)=>{
    try{
          const item = await debitModule.findByPk(req.params.expId);
          await item.destroy();
       res.status(200).json("Successfully Deleted!")
    } catch(err){
        res.status(400).json(err)
    }
}