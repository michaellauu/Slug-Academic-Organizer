const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create data schema that'll hold schedule info
const cDataSchema = new Schema({
  courseTitle: {
    type: String,
  },
  lecture: {
	DaysTime: String,
	MeetingDates: String,
  }	
});

module.exports = calData = mongoose.model("calData", cDataSchema, "test");