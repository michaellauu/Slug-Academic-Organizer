const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Import JSON data of courses
const schedule = require("./api/data/schedule.json");

// Define a model of data
const Data = require("./models/Data");
const ClassData = require("./models/classData");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const database = mongoose.connection;

// Base route that's still in progress ...
app.get("/", (req, res) => {
  res.send({ express: "Connected!" });
});

// Push all JSON data into database
app.post("/api", (req, res) => {
  for (let i = 0; i < bsoe.length; i++) {
    // Create new model that'll hold schedule data
    const newData = new Data({
      courseID: schedule[i].courseID,
      courseTitle: schedule[i].courseTitle,
      description: schedule[i].description,
      credits: parseInt(schedule[i].credits),
      terms: schedule[i].terms,
      sections: schedule[i].sections
    });

    newData.save().then(console.log(`Saving ${i} documents ...`));
  }

  res.send("Done!");
});

// A route that's still in progress ...
app.post("/api/submitClass", (req, res) => { 
	console.log(req.body);
  const classData = new ClassData({
  	courseID: req.body.class,
  	meetingDays: [req.body.M, req.body.Tu, req.body.W, req.body.Th, req.body.F],
  	startTime: req.body.startTime,
  	endTime: req.body.endTime,
  	location: req.body.location,
  	section: req.body.section,
  	sMeetingDays: [req.body.sM, req.body.sTu, req.body.sW, req.body.sTh, req.body.sF],
  	sStartTime: req.body.sStartTime,
  	sEndTime: req.body.sEndTime,
  	sLocation: req.body.sLocation
  });
  classData.save().then(console.log(`Saving documents ...`));
  res.send({ express: "done" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
