const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
