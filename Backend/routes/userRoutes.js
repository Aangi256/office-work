const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/add", async (req, res) => {
  try {
    const { name, age, country, email } = req.body;

    if (!name || !age || !country || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = new User({ name, age, country, email });
    await user.save();

    res.status(201).json({
      message: "User added successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: "Internal error occured " });
  }

  return res.status(500).json({
    message:"Server error"
  });
});




router.post("/checkemails", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email :email });

    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/",async (req,res)=>{
  console.log("Data is been read");
  
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({message: "Error fetching users"})
  }
});

module.exports = router;
