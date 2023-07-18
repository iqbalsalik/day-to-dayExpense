const sequelize = require("../utils/dataBase");
const RecordServices = require("../Services/recordServices");

exports.getAllCredit = async(req,res)=>{
    try{
       const result = await RecordServices.getCredit(req)
       res.status(200).json(result)
    }catch(err){
        console.log(err);
        res.status(400).json("Something Went Wrong!!")
    }
}

exports.addCredit = async(req,res)=>{
    let t;
    try {
        const {amount} = req.body
         t = await sequelize.transaction();
        const result = await RecordServices.createCredit(req,t)
        let totalCredit = req.user.totalCredit;
        const finalAmount = totalCredit+amount;
        await req.user.update({
            totalCredit: finalAmount
        },{transaction:t})
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
        const item = await RecordServices.findCreditByParams(req);
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

