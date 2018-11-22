const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create data schema that'll hold schedule info
const classDataSchema = new Schema({
  userToken: {
    type: String,
    trim: true,
    required: true
  },
  courseID: {
    type: String,
    trim: true,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  quarter: {
    type: Number, //again: 0-summer, 1-fall, 2-spring, 3-winter
    required: true
  },
  grade: {
    type: Number,
    required: true,
    default: 14
  },
  units: {
    type: Number,
    required:true,
    default: 0
  }
});

module.exports = ClassData = mongoose.model("ClassData", classDataSchema, "userClasses");
