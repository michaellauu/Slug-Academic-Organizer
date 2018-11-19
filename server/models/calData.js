const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create data schema that'll hold schedule info
const cDataSchema = new Schema({
  courseTitle: {
    type: String,
  },
  lecture: {
	days: String,
	times: String,
	room: String,
	instructor: String,
	meetingDates: String,
  }	
});

module.exports = calData = mongoose.model("calData", cDataSchema, "test");