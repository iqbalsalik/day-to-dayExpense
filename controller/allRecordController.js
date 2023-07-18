const RecordServices = require("../Services/recordServices");

exports.getMonthlyRecord = async (req, res) => {
    try {
        let offsetC;
        let offsetD;
        let limitToShow
        if (+req.query.height >= 500) {
            offsetC = (+req.query.page - 1) * 4;
            offsetD = (+req.query.page - 1) * 4;
            limitToShow = 4
        } else {
            offsetC = (+req.query.page - 1) * 2;
            offsetD = (+req.query.page - 1) * 2;
            limitToShow = 2
        }
        const expenseCount = await RecordServices.expenseCount(req);
        const creditCount = await RecordServices.creditCount(req);
        const nOffset = offsetC + offsetD
        const resultD = await RecordServices.getExpenseWithOffset(offsetD,limitToShow,req);

        const resultC = await RecordServices.getCreditWithOffset(offsetC,limitToShow,req);
        const totalExpense = req.user.totalExpense
        const totalCredit = req.user.totalCredit

         res.status(200).json({
            resultD,
            resultC,
            currentPage: req.query.page,
            nextPage: +req.query.page + 1,
            prevPage: +req.query.page - 1,
            isNextPage: offsetC+resultC.length < creditCount || offsetD + resultD.length < expenseCount,
            isPrevPage: nOffset > 0,
            isPremium: req.user.isPremium,
            totalExpense: totalExpense,
            totalCredit: totalCredit,
            creditLength: resultC.length,
            debitLength: resultD.length
         })
    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}


const date = new Date()

exports.downloadMonthlyData = async (req, res) => {
    try {
        const userData = await RecordServices.getExpense(req);
        const stringyfiedData = JSON.stringify(userData);
        const fileName = `ExpenseData/${req.user.id}/${new Date()}`
        const fileUrl = await RecordServices.uploadToAws(stringyfiedData, fileName)
        await RecordServices.creatDownload(req,fileUrl);
        res.status(200).json({ fileUrl, response: "Success" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ err, response: "Something Went Wrong!" })
    }
}

exports.showPrevDownloads = async (req, res) => {
    try {
        const records = await RecordServices.getDownloads(req);
        res.status(200).json({ records })

    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}

exports.addNotes = async (req, res) => {
    try {
        const result = await RecordServices.createNote(req)
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json("Something Went Wrong!")
    }
}

exports.getAllNotes = async (req, res) => {
    try {
        const result = await RecordServices.getNotes(req);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json("Something Went Wrong!")
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const note = await RecordServices.findNotes(req)
        await note.destroy();
        res.status(200).json("Successfully Deleted")
    } catch (err) {
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}