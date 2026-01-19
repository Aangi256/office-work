const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/add", async (req, res) => {
  try {
    const { name, age, country, email } = req.body;

    if (!name || !age || !country || !email) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = new User({ name, age, country, email });
    await user.save();

    res.status(201).json({
      message: "User added successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});



module.exports = router;
