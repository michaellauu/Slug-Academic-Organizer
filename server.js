const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// JSON
const schedule = require("./lib/data/schedule.json");

// Models
const ClassData = require("./server/models/classData");
const Data = require("./server/models/Data");

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

// Sorts User Class data into dictionary: {year: [summer classes], [spring classes], [winter classes], [fall classes]}
function sort(userClasses){
	var sorted = {};
	for(i=0; i<userClasses.length; i++){
		if (!(userClasses[i].year in sorted)){ //if not in dictionary
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
	console.log(req.body);
	ClassData.find({'userToken': req.body.token}, function(err, classes){
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
				sorted = sort(userClasses);
			});
			res.send(sorted);
		}
	}).then(console.log(`Getting user classes ...`));
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

    // Save to db under collection data(s)
    newData.save().then(console.log(`Saving ${i} documents ...`));
  }

  res.send("Done!");
});

// Posts class form submission to database
app.post("/api/submitClass", (req, res) => {
  console.log(req.body);
  const classData = new ClassData({
  	courseID: req.body.class,
  	userToken: req.body.token,
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

app.listen(port, () => console.log(`Listening on port ${port}`));
