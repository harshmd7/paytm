const express = require("express");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.put("/edit", async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/",async(req,res)=>{

    try {

        const filter = req.query.filter?.trim() || ''

        if (!filter) {
      return res.status(400).json({ message: "Please provide a name to search" });
    }
         
        const users = await User.find({
            $or: [
                {firstname : {$regex:filter,$options: "i"}},
                {lastname : {$regex:filter,$options: "i"}}
            ]
        }).select("-password");

        
    
      

        if (users.length === 0) {
          return res.status(404).json({ message: "No users found" });
        }
        res.json({
          message: "Users found",
          count: users.length,
          users,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
  } 

)

module.exports = router;