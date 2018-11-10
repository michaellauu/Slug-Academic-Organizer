const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create data schema that'll hold schedule info
const cDataSchema = new Schema({
  courseTitle: {
    type: String,
  },
  lecture: {
	DaysTimes: String,
	MeetingDates: String,
  }	
});

module.exports = calData = mongoose.model("calData", cDataSchema, "test");