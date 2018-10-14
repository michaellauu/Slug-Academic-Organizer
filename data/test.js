const scraper = require("./scraper");

/* Simple test file for scraper.js, if more functions
 * are developed, I'll be testing them here for now
*/

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
