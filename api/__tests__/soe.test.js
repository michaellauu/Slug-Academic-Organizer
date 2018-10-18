const SOE = require("../soe");
const GE = require("../data/ge.json");

/* Simple test file for scraper.js, if more functions
 * are developed, I'll be testing them here for now
*/

// soe.js -------------------------------------------------

describe("Test ge, department, & course validity", () => {
  test("Returns true: ge exists", () => {
    expect(SOE.checkGE("cc")).toEqual(true);
  });

  test("Returns false: ge non-existent", () => {
    expect(SOE.checkGE("fm")).toEqual(false);
  });

  test("Returns true: department exists", () => {
    expect(SOE.checkDepartment("Computer Engineering")).toEqual(true);
  });

  test("Returns false: department non-existent", () => {
    expect(SOE.checkDepartment("Applied")).toEqual(false);
  });

  test("Returns true: course exists", () => {
    expect(SOE.checkCourse("cmps5j")).toEqual(true);
  });

  test("Returns false: course non-existent", () => {
    expect(SOE.checkCourse("121cmps")).toEqual(false);
  });
});

// generalEd.js -------------------------------------------
