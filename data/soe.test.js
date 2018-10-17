const soe = require("./soe");
const ge = require("./ge.json");

/* Simple test file for scraper.js, if more functions
 * are developed, I'll be testing them here for now
*/

// console.log(soe.getCourses());
// soe.getDepartments();

// soe.js -------------------------------------------------

// All departments
test("Returns all SOE departments", () => {
  expect.assertions(1);
  return soe.getDepartments().then(data => {
    expect(data).toContain("Computer Science");
  });
});

// All courses
test("Returns all SOE courses", () => {
  expect.assertions(1);
  return soe.getDepartments().then(data => {
    expect(data).toContain("CMPS115: Introduction to Software Engineering");
  });
});

// Check if course exists: true
test("Returns true: course exists", () => {
  expect.assertions(1);
  return soe.checkCourse("cmps5j").then(data => {
    expect(data).toBeTruthy();
  });
});

// Check if course exists: false
test("Returns false: course doesn't exist", () => {
  expect.assertions(1);
  return soe.checkCourse("121cmps").then(data => {
    expect(data).toBeFalsy();
  });
});

// // Returns all courses currently
// soe.quarterSchedule("cmps5j");

// generalEd.js -------------------------------------------

// console.log(ge.CC.disc);
test("Returns description of CC ge", () => {
  expect(ge.CC.disc).toBe("Cross-Cultural Analysis");
});
// console.log(ge.SR.credits);
test("Returns minimum credit of SR ge", () => {
  expect(ge.SR.credits).toBe(5);
});
// console.log(ge.PE.types["PE-E"]);
test("Returns description of PE-E ge", () => {
  expect(ge.PE.types["PE-E"]).toBe("Environmental Awareness");
});
