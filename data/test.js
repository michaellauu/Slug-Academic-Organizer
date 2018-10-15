const soe = require("./soe");
const ge = require("./ge.json");

/* Simple test file for scraper.js, if more functions
 * are developed, I'll be testing them here for now
*/

// soe.js -------------------------------------------------

// Returns all departments
soe.getDepartments();

// Returns all courses
soe.getCourses();

// Returns true since course exists
soe.checkCourse("ams290a");

// Returns false since course doesn't exist
soe.checkCourse("ams290a290");

// generalEd.js -------------------------------------------

console.log(ge.CC.disc);
console.log(ge.SR.credits);
console.log(ge.PE.types["PE-E"]);
