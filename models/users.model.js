const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { roles } = require("../utils/constants");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.teacher, roles.student],
    default: roles.student,
  },
});

// -------------------------------
// Hash users password before saving to database
// -------------------------------
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    next();
  } catch (error) {
    next(error);
  }
});

// -------------------------------
// Use a custom mongoose method to verify the password given by the user
// -------------------------------
userSchema.methods.validatePassowrd = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
