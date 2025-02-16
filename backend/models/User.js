const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: String,
  username: { type: String, unique: true },
  password: String,
  language: String,
  purpose: String,
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  module.exports = mongoose.model("User", userSchema);