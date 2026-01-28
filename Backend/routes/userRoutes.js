const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middleware/upload");

router.post(
  "/add",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, age, country, email } = req.body;

      if (!name || !age || !country || !email) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const user = new User({
        name,
        age: Number(age),
        country,
        email,
        image: req.file ? req.file.filename : null,
      });

      await user.save();

      res.status(201).json({
        message: "User added successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);



router.post("/checkemails", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error("Check Email Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/update", upload.single("image"), async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const updateData = { name, age };


    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    res.json({ message: "User updated", updatedUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body;
    await User.findOneAndDelete({ email });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
