const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create data schema that'll hold schedule info
const classDataSchema = new Schema({
  courseID: {
    type: String,
    trim: true,
    required: true
  },/*
  meetingDays: {
    type: [Boolean],
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  section: {
    type: Boolean,
    required: true
  },
  sMeetingDays: [Boolean],
  sStartTime: String,
  sEndTime: String,
  sLocation: {
    type: String,
    trim: true
  }*/
});

module.exports = ClassData = mongoose.model("ClassData", classDataSchema, "userClasses");