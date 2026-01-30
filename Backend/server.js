const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // ✅ FIXED
const app = express();

const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


mongoose
  .connect("mongodb://localhost:27017/officeworkDB")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB connection error:", err));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err.message) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
