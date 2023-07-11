const sequelize = require("../utils/dataBase");
const expense = require("../models/expenseDebit");
const credit = require("../models/expenseCredit");
const User = require("../models/signupModel");
const Downloads = require("../models/downloads");
const Notes = require("../models/notes");
const AWS = require("aws-sdk");
require("dotenv").config();

const RecordServices = require("../Services/recordServices");

exports.getMonthlyRecord = async(req,res)=>{
    try{
        const windowHeight = +req.query.height;
        let limitToShow;
        let offsetC;
        let offsetD;
        if(windowHeight>=600){
            offsetC = (+req.query.page-1)*6;
            offsetD = (+req.query.page-1)*6;
            limitToShow = 6
        }else{
            offsetC = (+req.query.page-1)*4;
            offsetD = (+req.query.page-1)*4
            limitToShow = 4
        }
        const resultD = await req.user.getExpense_debits({
            offset:offsetD,
            limit:limitToShow
        })

        const resultC = await req.user.getExpense_credits({
            offset:offsetC,
            limit:limitToShow
        })
        const creditLength = resultC.length;
        const debitLength = resultD.length;
        const totalExpense = req.user.totalExpense
        const totalCredit = req.user.totalCredit
       res.status(200).json({
        resultD,
        resultC,
        currentPage:req.query.page,
        nextPage:+req.query.page+1,
        prevPage:+req.query.page-1,
        isNextPage:offsetC<(resultC.length-1) ||offsetD<(resultD.length-1),
        isPrevPage:offsetC>0 || offsetD>0,
        isPremium:req.user.isPremium,
        totalExpense:totalExpense,
        totalCredit:totalCredit,
        creditLength:creditLength,
        debitLength:debitLength
       })

    }catch(err){
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}

 
const date = new Date()

exports.downloadMonthlyData = async(req,res)=>{
    try{
        const userData = await req.user.getExpense_debits();
        const stringyfiedData = JSON.stringify(userData);
        const fileName = `ExpenseData/${req.user.id}/${new Date()}`
        const fileUrl =await RecordServices.uploadToAws(stringyfiedData,fileName)
        await req.user.createDownload({
            date:`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
            fileUrl:fileUrl
        })
        res.status(200).json({fileUrl,response:"Success"})
        
    }catch(err){
        console.log(err)
        res.status(500).json({err,response:"Something Went Wrong!"})
    }
}

exports.showPrevDownloads = async (req,res)=>{
try{
    const records = await req.user.getDownloads()
    res.status(200).json({records})

}catch(err){
    console.log(err)
    res.status(500).json("Something Went Wrong!")
}
}

exports.addNotes = async (req,res)=>{
    try{
        const result = await req.user.createNote({
            note:req.body.note,
            date:req.body.date,
            month:req.body.month,
            year:req.body.year,
            day:req.body.day
        })
        res.status(200).json(result)
    }catch(err){
        console.log(err);
        res.status(500).json("Something Went Wrong!")
    }
}

exports.getAllNotes = async(req,res)=>{
    try{
        const result = await req.user.getNotes();
        res.status(200).json(result)
    }catch(err){
        res.status(500).json("Something Went Wrong!")
    }
}

exports.deleteNote = async(req,res)=>{
    try{
        const id = req.params.id;
        const note = await Notes.findByPk(id);
        await note.destroy();
        res.status(200).json("Successfully Deleted")
    }catch(err){
        console.log(err)
        res.status(500).json("Something Went Wrong!")
    }
}