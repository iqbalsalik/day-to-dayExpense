const path = require("path");

const debitModule = require("../models/expenseDebit");

exports.getExpensePage = (req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","daily.html"))
}

exports.getAllExpenseData = async(req,res)=>{

let result = await req.user.getExpense_debits();
if(req.user.isPremium==true){
    res.status(200).json({result,"isPremium":true})
}else{
    res.status(200).json({result,"isPremium":false})
}
}


exports.addDebitAmount = async (req,res)=>{
    try{
        let {category,amount,description} = req.body;
       const result = await req.user.createExpense_debit({
            category:category,
            amount:amount,
            description:description
        })
        let totalExpense = req.user.totalExpense;
        await req.user.update({
            totalExpense:totalExpense+Number(amount)
        })
        res.status(200).json(result)
    }catch(err){
        res.status(400).json("Something Went Wrong!!")
    }
}

exports.deleteExpense = async(req,res)=>{
    try{
          const item = await debitModule.findByPk(req.params.expId);
          let amount = item.amount
          console.log(typeof(amount))
          await item.destroy();
          let totalExpense = req.user.totalExpense
          req.user.update({
            totalExpense:totalExpense-amount
          })
       res.status(200).json("Successfully Deleted!")
    } catch(err){
        res.status(400).json(err)
    }
}