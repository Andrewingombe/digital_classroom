const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { roles } = require("../utils/constants");

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

const User = mongoose.model("User", userSchema);
module.exports = User;
