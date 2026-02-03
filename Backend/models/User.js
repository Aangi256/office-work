const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  email: { type: String, unique: true },
  password: { type: String, required: true }, // must exist
  image: String,
});

// Optional: pre-save hook to hash password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
