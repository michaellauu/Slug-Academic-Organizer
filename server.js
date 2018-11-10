const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// JSON
const schedule = require("./lib/data/schedule.json");
const geSchedule = require("./lib/data/ge.json")

// Models
const ClassData = require("./server/models/classData");
const Data = require("./server/models/Data");
const GEData = require("./server/models/geData")
const calData = require("./server/models/calData");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Port
const port = process.env.PORT || 5000;

// Connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// API routes
require("./server/routes/api/signin.js")(app);

// Base route that's still in progress ...
app.get("/", (req, res) => {
  res.send({ express: "Connected!" });
});

// Sorts User Class data into dictionary: {year: [summer classes], [fall classes], [spring classes], [winter classes]}
function sort(userClasses){
	var sorted = {};
	for(i=0; i<userClasses.length; i++){
		if (!(userClasses[i].year in sorted)){ // If not in dictionary
			sorted[userClasses[i].year] = [[], [], [], []];
			sorted[userClasses[i].year][userClasses[i].quarter].push(
				{courseID: userClasses[i].courseID, _id: userClasses[i]._id});
		}else{
			sorted[userClasses[i].year][userClasses[i].quarter].push(
				{courseID: userClasses[i].courseID, _id: userClasses[i]._id});
		}
	}
	return sorted;
}

// Gets all user classes from the database and returns in a sorted manner
app.post("/api/userClasses", (req, res) => {
	var userClasses = [];
	var sorted = {};
	// Find all the user classes
	ClassData.find({'userToken': req.body.userID}, function(err, classes){
		if(err){
			console.log(err);
			return res.status(500).send({message: 'Failed to load user classes'});
		}else{
			classes.forEach(function(userClass){
				/*var newClass = {};
				if(userClass.section){
					newClass = {
						courseID: userClass.courseID,
						meetingDays: userClass.meetingDays,
						sMeetingDays: userClass.sMeetingDays,
						startTime: userClass.startTime,
						endTime: userClass.endTime,
						location: userClass.location,
						section: userClass.section,
						sStartTime: userClass.sStartTime,
						sEndTime: userClass.sEndTime,
						sLocation: userClass.sLocation
					};

				}else{
					newClass = {
						courseID: userClass.courseID,
						meetingDays: userClass.meetingDays,
						startTime: userClass.startTime,
						endTime: userClass.endTime,
						location: userClass.location,
						section: userClass.section,
					};
				}*/
				const newClass = {courseID: userClass.courseID, year: userClass.year,
					quarter: userClass.quarter, _id: userClass._id};

				userClasses.push(newClass);
			});
			sorted = sort(userClasses); // Sort all the data so we can display it easily
			res.send(sorted);
		}
	}).then(console.log(`Getting user classes ...`));
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

    // Save to db under collection data(s)
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
  GEData.find(function (err, ge) {
    if (err) {
      //error messages
      console.log("error");
      return res.status(500).send({ geError: "Error" });
    } else {
      //array requirements
      requirements = [];
      //for each GE, put each category in the right place
      ge.forEach(function (GE) {
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
  	userToken: req.body.userID,
  	quarter: req.body.quarter,
  	year: req.body.year
  	/*meetingDays: [req.body.M, req.body.Tu, req.body.W, req.body.Th, req.body.F],
  	startTime: req.body.startTime,
  	endTime: req.body.endTime,
  	location: req.body.location,
  	section: req.body.section,
  	sMeetingDays: [req.body.sM, req.body.sTu, req.body.sW, req.body.sTh, req.body.sF],
  	sStartTime: req.body.sStartTime,
  	sEndTime: req.body.sEndTime,
  	sLocation: req.body.sLocation*/
  });
  classData.save(function(err, newClass){
  	res.send({ express: "done", _id: newClass._id });
  });
});

// Deletes class from the database
app.post("/api/deleteClass", (req, res) =>{
	ClassData.findByIdAndRemove(req.body._id, function(err, classes){
		if(err){
			console.log(err);
			return res.status(500).send({message: 'Failed to load user classes'});
		}else{
			res.send({ express: "done" });
		}
	});
});

//based off Chtzhou's GE
app.get("/api/getCalendar", (req, res) => {
  calData.find(function (err, cal) {
    if (err) {
      //error messages
      console.log("error");
      return res.status(500).send({ cError: "Error" });
    } else {
      events = [];
      //parse data into readable for FullCalendar
      cal.forEach(function (c) {
		var dateString = c.lecture.MeetingDates;
		//console.log(dateString);
		if(dateString == null) return; //without this it crashes because not all classes have dates
		var dateCut = dateString.split("-", 2);
		//console.log(dateCut);
		var daysString = c.lecture.DaysTimes;
		console.log(daysString);
		if(daysString == null) return;
		var daysCut = daysString.split(" ", 2);
		if(daysCut[0] == "MWF") {
			var day = [1,3,5];
			//console.log(daysCut[0]);
		}
		if(daysCut[0] == "MW") {
			var day = [1,3];
			//console.log(daysCut[0]);
		}
		if(daysCut[0] == "TuTh") {
			var day = [2,4];
			//console.log(daysCut[0]);
		}
		
        const newCal = {
          title: c.courseTitle,
		  start: dateCut[0],
		  end: dateCut[1],
		  daysOfWeek: day, //dow doesnt work either
        };
        //push data to events
        events.push(newCal);
      });
      //send events
      res.send(events);
	  //logging
	  console.log(events);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
