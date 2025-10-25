const express = require("express");
const User = require("../models/user.model.js");
const Account = require("../models/bankAccount.model.js");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get('/balance',async(req,res)=>{

    try {
        const userId = req.user.id;
    
        const account = await Account.findOne({ userId });
         if (!account) {
          return res.status(404).json({ message: "Account not found" });
        }
    
        res.status(200).json({
          message: "Balance fetched successfully",
          balance: account.balance,
        });
    
    } catch (error) {
        console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Server error" });
    }

})

router.post('/transfer',async(req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction()
    const {amount,to} = req.body;
    const account = await Account.findOne({ userId : req.user.id }).session(session);
    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:'Insufficient Balance'
        })

    }
    const toAccount = await Account.findOne({userId:to}).session(session); 
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message : 'invalid user, user doesnot exist'
        })
    }

    await Account.updateOne({userId:req.user.id},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
    await session.commitTransaction()
    res.json({
            message:"transfer successfully"
        })



})

module.exports = router;