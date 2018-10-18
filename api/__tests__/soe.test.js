const SOE = require("../soe");
const GE = require("../ge.json");
const axios = require("axios");

/* Simple test file for scraper.js, if more functions
 * are developed, I'll be testing them here for now
*/

// soe.js -------------------------------------------------

// All departments

// All courses

// Check if course exists: true

// Check if course exists: false

// Returns all courses currently

// generalEd.js -------------------------------------------

// console.log(ge.CC.disc);
test("Returns description of CC ge", () => {
  expect(GE.CC.disc).toBe("Cross-Cultural Analysis");
});
// console.log(ge.SR.credits);
test("Returns minimum credit of SR ge", () => {
  expect(GE.SR.credits).toBe(5);
});
// console.log(ge.PE.types["PE-E"]);
test("Returns description of PE-E ge", () => {
  expect(GE.PE.types["PE-E"]).toBe("Environmental Awareness");
});
