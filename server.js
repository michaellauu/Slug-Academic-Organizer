const express = require("express");
const scraper = require("./data/soe.js");
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const depo = scraper.getDepartments();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send({ express: depo });
});

app.post("/api/getClasses", (req, res) => {
  console.log(req.body.class);
  //do stuff with the scraper?
  res.send({ express: "I don't know what to put here" });
});

app.listen(port);
