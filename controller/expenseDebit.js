const path = require("path");

const sequelize = require("../utils/dataBase");


const RecordServices = require("../Services/recordServices");
exports.getExpensePage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "daily.html"))
}

exports.getAllExpenseData = async (req, res) => {
    let result = await RecordServices.getExpense(req);
    if (req.user.isPremium == true) {
        res.status(200).json({ result, "isPremium": true })
    } else {
        res.status(200).json({ result, "isPremium": false })
    }
}


exports.addDebitAmount = async (req, res) => {
    let t;
    try {
        t = await sequelize.transaction();
        const result = await RecordServices.createDebit(req,t)
        let totalExpense = req.user.totalExpense;
        await req.user.update({
            totalExpense: totalExpense + Number(amount)
        }, { transaction: t })
        await t.commit();
        res.status(200).json(result)
    } catch (err) {
        await t.rollback()
        res.status(400).json("Something Went Wrong!!")
    }
}

exports.deleteExpense = async (req, res) => {
    let t;
    try {
        t = await sequelize.transaction();
        const item = await RecordServices.findDebitByParams(req)
        let amount = item.amount
        await item.destroy({transaction:t});
        let totalExpense = req.user.totalExpense
        await req.user.update({
            totalExpense: totalExpense - amount
        },{transaction:t});
        await t.commit()
        res.status(200).json("Successfully Deleted!")
    } catch (err) {
        await t.rollback()
        res.status(400).json("Something Went Wrong!")
    }
}