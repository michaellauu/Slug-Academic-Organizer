const express = require("express");
// const scraper = require('./data/');
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send({ express: "Express is now connected" });
});

app.post("/api/getClasses", (req, res) => {
  console.log(req.body.class);
  //do stuff with the scraper?
  res.send({ express: "I don't know what to put here" });
});
