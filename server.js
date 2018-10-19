const express = require("express");
const scraper = require("./api/soe.js");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;


// Set up Mongoose
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds137003.mlab.com:37003/re');
mongoose.Promise = global.Promise;


// API routes
require('./server/routes/')(app);


app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send({ express: "Connected!" });
});

app.post("/api/getClasses", (req, res) => {
  console.log(req.body.class);
  //do stuff with the scraper?
  res.send({ express: "I don't know what to put here" });
});

app.listen(port);
