const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../middleware/upload");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");




router.post("/login", async (req, res) => {
 

  try {
    const { email, password } = req.body;

    console.log(" Login request:", { email, password });

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log(" User from DB:", user);

    if (!user || !user.password) {
      console.log(" User not found or password missing");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // const testPasswords = ["Aangi@m", "Kaivna@7", "123456", "password"];
    // for (const p of testPasswords) {
    // const r = await bcrypt.compare(p, user.password);
    // console.log(`TEST "${p}" =>`, r);
}

    const inputPassword = password.trim();
    console.log(" Input password:", inputPassword);
    console.log(" DB password:", user.password);

    const isBcryptHash = /^\$2[aby]\$\d{2}\$/.test(user.password);
    console.log(" Is bcrypt hash:", isBcryptHash);

    let isMatch = false;

    if (isBcryptHash) {
      isMatch = await bcrypt.compare(inputPassword, user.password);
      console.log(" bcrypt compare result:", isMatch);
    } else {
      isMatch = inputPassword === user.password;
      console.log(" plaintext compare result:", isMatch);

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(inputPassword, 10);
        user.password = hashedPassword;
        await user.save();
        console.log(" Password migrated to hash");
      }
    }

    if (!isMatch) {
      console.log(" Password mismatch");
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log(" Login success");

    res.status(200).json({
      message: "Login success",
      token,
    });
  } catch (error) {
    console.error(" Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, age, country, email, password } = req.body;

    if (!name || !age || !country || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      age: Number(age),
      country,
      email,
      password: hashedPassword, 
      image: req.file ? req.file.filename : null,
    });

    await user.save();

    res.status(201).json({
      message: "User added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



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


router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const sort = req.query.sort || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;

    const allowedSortFields = ["name", "age", "email", "country"];
    const sortField = allowedSortFields.includes(sort) ? sort : "name";

    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ],
    };

    const totalUsers = await User.countDocuments(searchQuery);

    const users = await User.find(searchQuery)
      .sort({ [sortField]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/update", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, age, email, password, country } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required for update" });
    }

    const updateData = { name, age, country };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/delete", auth, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    await User.findOneAndDelete({ email });
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
