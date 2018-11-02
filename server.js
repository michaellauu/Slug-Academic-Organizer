const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Import JSON data of courses
const schedule = require("./api/data/schedule.json");
const geSchedule = require("./api/data/ge.json")

// Define a model of data
const ClassData = require("./server/models/classData");
const Data = require("./server/models/Data");
const GEData = require("./server/models/geData")

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

// API routes
// require("./server/routes/api/signin");

// Base route that's still in progress ...
app.get("/", (req, res) => {
  res.send({ express: "Connected!" });
});

// Push all JSON data into database
app.post("/api", (req, res) => {
  for (let i = 0; i < schedule.length; i++) {
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

//ge post request
app.post("/api/ge", (req, res) => {
  for (let i = 0; i < geSchedule.length; i++) {
    // Create new model that'll hold schedule data
    const geData = new GEData({
      geID: geSchedule[i].geID,
      desc: geSchedule[i].desc,
      credits: parseInt(geSchedule[i].credits),
    });
    geData.save().then(console.log(`Saving ${i} documents ...`));
  }
  res.send("GE Done!");
});

//ge get request
app.get("/api/GERequirements", (req, res) => {
  GEData.find(function(err, ge){
    if(err){
      //error messages
      console.log("error");
      return res.status(500).send({geError: "Error"});
    }else{
      //array requirements
      requirements = [];
      //for each GE, put each category in the right place
      ge.forEach(function(GE){
        const NewGE = {
          geID: GE.geID,
          desc: GE.desc,
          credits: GE.credits,
        };
        //pushing each GE onto the array
        requirements.push(NewGE);
      });
      //send the array to GERequirements.js
      res.send(requirements);
    }
  });
});


// Posts class form submission to database
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
