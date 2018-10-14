const scraper = require("./scraper");

// FOCUSED ON SOE DEPARTMENTS

// Returns all departments
scraper.getDepartments();

// Returns all courses
setTimeout(() => {
  scraper.getCourses();
}, 2500);

// Returns true since course exists
setTimeout(() => {
  scraper.checkCourse("ams290a");
}, 7500);

// Returns false since course doesn't exist
setTimeout(() => {
  scraper.checkCourse("ams290a290");
}, 10000);
