const sequelize = require("../utils/dataBase");
const expense = require("../models/expenseDebit");
const credit = require("../models/expenseCredit");
const User = require("../models/signupModel");
const Downloads = require("../models/downloads");
const AWS = require("aws-sdk");
require("dotenv").config();

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

 async function uploadToAws(data,name){
try{
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const IAM_USER_KEY = process.env.AWS_USER_KEY;
    const IAM_USER_SECRET = process.env.AWS_USER_SECRET;

    let s2Bucket = new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        Bucket:BUCKET_NAME
    })

    var params = {
        Bucket:BUCKET_NAME,
        Key:name,
        Body:data,
        ACL:"public-read"
    }

    return new Promise((resolve,reject)=>{
        s2Bucket.upload(params,(err,response)=>{
            if(err){
                reject(err)
            }else{
                resolve (response.Location)
            }
        })
    })

    


}catch(err){
    return err
}
}
const date = new Date()

exports.downloadMonthlyData = async(req,res)=>{
    try{
        const userData = await req.user.getExpense_debits();
        const stringyfiedData = JSON.stringify(userData);
        const fileName = `ExpenseData/${req.user.id}/${new Date()}`
        const fileUrl =await uploadToAws(stringyfiedData,fileName)
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