const expense = require("../models/expenseDebit");
const credit = require("../models/expenseCredit");
const Notes = require("../models/notes");
const creditModel = require("../models/expenseCredit");
const debitModule = require("../models/expenseDebit");
const Users = require("../models/signupModel");

require("dotenv").config();

const AWS = require("aws-sdk");

exports.createUser = (req,hash) =>{
    return Users.create({
        name: req.body.name,
        emailId: req.body.emailId,
        password: hash
    });
}

exports.findAllUsers = ()=>{
    return Users.findAll();
}

exports.findUserByEmail = (req)=>{
    const email = req.body.email;
    return Users.findOne({
        where: {
            emailId: email
        }
    });
}

exports.expenseCount  = (req)=>{
  return  expense.count({
        where: {
            userId: req.user.id
        }
    })
};

exports.creditCount = (req)=>{
    return credit.count({
        where: {
            userId: req.user.id
        }
    })
};

exports.getExpenseWithOffset = (offset,limit,req)=>{
    return req.user.getExpense_debits({
        offset: offset,
        limit: limit
    })
};

exports.getCreditWithOffset = (offset,limit,req)=>{
    return req.user.getExpense_credits({
        offset: offset,
        limit: limit
    })
};

exports.getExpense = (req)=>{
    return req.user.getExpense_debits();
};

exports.getCredit = (req)=>{
    return req.user.getExpense_credits();
};

const date = new Date()
exports.creatDownload = (req,fileUrl)=>{
    return req.user.createDownload({
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        fileUrl: fileUrl
    })
};

exports.getDownloads = (req)=>{
    return req.user.getDownloads()
};

exports.createNote = (req)=>{
    return req.user.createNote({
        note: req.body.note,
        date: req.body.date,
        month: req.body.month,
        year: req.body.year,
        day: req.body.day
    })
};

exports.createCredit = (req,t)=>{
    let { category, amount, description,createdDate,createdMonth,createdYear } = req.body;
    return req.user.createExpense_credit({
        category: category,
        amount: amount,
        description: description,
        createdDate:createdDate,
        createdMonth:createdMonth,
        createdYear:createdYear
    },{transaction:t});
};

exports.createDebit = (req,t)=>{
    let { category, amount, description,createdDate,createdMonth,createdYear } = req.body;
    return req.user.createExpense_debit({
        category: category,
        amount: amount,
        description: description,
        createdDate:createdDate,
        createdMonth:createdMonth,
        createdYear:createdYear
    }, { transaction: t });
}

exports.findCreditByParams = (req)=>{
    return creditModel.findByPk(req.params.expId);
};

exports.findDebitByParams = (req)=>{
   return debitModule.findByPk(req.params.expId);
}

exports.getNotes = (req)=>{
    return req.user.getNotes();
};

exports.findNotes = (req)=>{
    const id = req.params.id;
    return Notes.findByPk(id);
}

exports.uploadToAws = async (data,name)=>{
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