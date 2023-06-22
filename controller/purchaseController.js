const Razorpay = require("razorpay");

const Order = require("../models/order");

exports.buyPremium = async (req,res)=>{
try{
        const rzp = new Razorpay({
        key_id:"rzp_test_2dKaUw2ACG0Csl",
        key_secret: "CZcs5cOf76DD6c8OqR5MPHPK"
    })
    const amount = 2300;
    rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
        if(err){
            throw new Error(JSON.stringify(err))
        }
        await req.user.createOrder({orderId:order.id,status:"PENDING"})
        return res.status(200).json({order,key_id:rzp.key_id})
    })
} catch(err){
    res.status(400).json("Something Went Wrong!!")
}
}

exports.updateTransactionStatus = async (req,res)=>{
   try {
    const {payment_id,order_id}= req.body;
    const order = await Order.findOne({where:{
        orderId:order_id
    }})
    const result = await Promise.all([order.update({paymentId:payment_id,status:"SUCCESSFULL"}),req.user.update({isPremium:true})])
    // await order.update({paymentId:payment_id,status:"SUCCESSFULL"});
    // await req.user.update({
    //     isPremium:true
    // })
    res.status(200).json("Transaction Successfull!!")
      }catch(err){
        console.log(err)
      }
}

exports.updateFailureTransactionStatus= async(req,res)=>{
    try{
        const {order_id} = req.body;
        const order = await Order.findOne({where:{
            orderId:order_id
        }})
        await order.update({paymentId:"Payment Failed",status:"Failed"})
    }catch(err){
        console.log(err)
    }
}