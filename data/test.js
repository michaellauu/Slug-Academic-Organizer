const scraper = require("./scraper");

// console.log(scraper.getDepartments());
// console.log(scraper.getCourses());
if (scraper.checkCourse("ams290a")) {
  console.log("Course is valid");
}
