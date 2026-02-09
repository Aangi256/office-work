const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  email: { type: String, unique: true },
  password: { type: String, required: true }, 
  image: String,
});



module.exports = mongoose.model("User", userSchema);
