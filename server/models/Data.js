const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create data schema that'll hold schedule info
const DataSchema = new Schema({
  courseID: {
    type: String,
    trim: true,
    required: true
  },
  courseTitle: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  credits: {
    type: Number
  },
  terms: [String],
  sections: [String]
});

module.exports = Data = mongoose.model("Data", DataSchema);
