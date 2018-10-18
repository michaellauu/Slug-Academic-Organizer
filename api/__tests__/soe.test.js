const SOE = require("../soe");
const GE = require("../data/ge.json");

/* Simple test file for scraper.js, if more functions
 * are developed, I'll be testing them here for now
*/

// BSOE ---------------------------------------------------

describe("Test ge, department, & course validity", () => {
  test("Returns true: ge exists", () => {
    expect(SOE.checkGE("cc")).toEqual(true);
  });

  test("Returns false: no ge", () => {
    expect(SOE.checkGE("fm")).toEqual(false);
  });

  test("Returns true: department exists", () => {
    expect(SOE.checkDepartment("Computer Engineering")).toEqual(true);
  });

  test("Returns false: no department", () => {
    expect(SOE.checkDepartment("Applied")).toEqual(false);
  });

  test("Returns true: course exists", () => {
    expect(SOE.checkCourse("cmps5j")).toEqual(true);
  });

  test("Returns false: no course", () => {
    expect(SOE.checkCourse("121cmps")).toEqual(false);
  });
});

// Schedules ----------------------------------------------

describe("Test various course schedules", () => {
  test("Returns course logistical data", () => {
    expect(SOE.checkSchedule("cmps5j")).toContain("Fall18");
  });

  test("Returns no course logistical data", () => {
    expect(SOE.checkSchedule("cmps5c")).toEqual([]);
  });
});

// generalEd.js -------------------------------------------
