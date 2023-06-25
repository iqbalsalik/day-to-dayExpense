const e = require("express");
const Razorpay = require("razorpay");

const Order = require("../models/order");
const sequelize = require("../utils/dataBase");

exports.buyPremium = async (req,res)=>{
    let t;
try{
    t = await sequelize.transaction();
        const rzp = new Razorpay({
        key_id:"rzp_test_2dKaUw2ACG0Csl",
        key_secret: "CZcs5cOf76DD6c8OqR5MPHPK"
    })
    const amount = 2300;
    rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
        if(err){
            await t.rollback()
            throw new Error(JSON.stringify(err))
        }
        await req.user.createOrder({orderId:order.id,status:"PENDING"},{transaction:t})
        await t.commit();
        return res.status(200).json({order,key_id:rzp.key_id})
    })
} catch(err){
    await t.rollback()
    res.status(400).json("Something Went Wrong!!")
}
}

exports.updateTransactionStatus = async (req,res)=>{
    let t;
   try {
    t = await sequelize.transaction();
    const {payment_id,order_id}= req.body;
    const order = await Order.findOne({where:{
        orderId:order_id
    }})
    const result = await Promise.all([order.update({paymentId:payment_id,status:"SUCCESSFULL"},{transaction:t}),req.user.update({isPremium:true},{transaction:t})]);
    await t.commit()
    res.status(200).json("Transaction Successfull!!")
      }catch(err){
        await t.rollback();
        console.log(err)
      }
}

exports.updateFailureTransactionStatus= async(req,res)=>{
    let t;
    try{
        t = await sequelize.transaction();
        const {order_id} = req.body;
        const order = await Order.findOne({where:{
            orderId:order_id
        }},{transaction:t})
        await order.update({paymentId:"Payment Failed",status:"Failed"},{transaction:t});
        await t.commit()
    }catch(err){
        await t.rollback()
        console.log(err)
    }
}