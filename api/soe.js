"use strict";

// Refer to test.js which handles testing for the web scraper

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const classes = require("./data/courses.json");
const branches = require("./data/departments.json");
const general = require("./data/ge.json");
const schedules = require("./data/schedule.json");

/* Use of scraper documentation can be found here:
 * https://www.npmjs.com/package/cheerio
 * https://www.npmjs.com/package/axios
 * https://nodejs.org/api/fs.html
*/

/* Return all BSOE departments in JSON
 * DON'T CALL UNLESS FRESH JSON IS NEEDED
 * go to ./data to check departments.json
 */
const getDepartments = () => {
  axios
    .get("https://courses.soe.ucsc.edu/")
    .then(res => {
      if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        let departments = [];
        // Grab elements and store as object
        $("h2").map((i, elem) => {
          departments[i] = {
            title: $(elem)
              .text()
              .trim()
          };
        });
        // Create JSON from departments
        fs.writeFile(
          "data/departments.json",
          JSON.stringify(departments, null, 4),
          err => {
            console.log("File successfully written");
          }
        );
      }
    })
    .catch(e => console.log(e));
};

/* Return all BSOE courses in JSON
 * DON'T CALL UNLESS FRESH JSON IS NEEDED
 * go to ./data to check courses.json
 */
const getCourses = () => {
  axios
    .get("https://courses.soe.ucsc.edu/")
    .then(res => {
      if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        let courses = [];
        // Grab elements and store as object
        $("li").map((i, elem) => {
          let str = $(elem)
            .text()
            .split(":");
          courses[i] = {
            courseID: str[0].trim(),
            courseTitle: str[1].trim()
          };
        });
        // Create JSON from courses
        fs.writeFile(
          "data/courses.json",
          JSON.stringify(courses, null, 4),
          err => {
            console.log("File successfully written");
          }
        );
      }
    })
    .catch(e => console.log(e));
};

/* Return all BSOE course schedules in JSON
 * DON'T CALL UNLESS FRESH JSON IS NEEDED
 * go to ./data to check schedule.json
 */
const getSchedule = () => {
  axios.get("https://courses.soe.ucsc.edu/courses/cmps").then(res => {
    if (res.status === 200) {
      const html = res.data;
      const $ = cheerio.load(html);
      let schedule = [];
      $(".course-name").map((i, elem) => {
        // Get course ID
        const courses = $(elem)
          .children("a")
          .text()
          .split(":")
          .map(tag => tag.trim());

        // Get quarters offered
        let season = $(elem)
          .parent()
          .next()
          .children(".class")
          .find("li")
          .children("a")
          .map((i, elem) => {
            return $(elem).attr("href");
          })
          .get();

        // Break apart the href into an array
        season = season.map((i, elem) => {
          return i
            .split("/")
            .map(tag => tag.trim())
            .filter(function(n) {
              return n != "";
            });
        });

        // Get section data of course
        const section = $(elem)
          .parent()
          .next()
          .children(".class")
          .find("li")
          .contents()
          .text()
          .split("\n")
          .map(tag => tag.trim())
          .filter(function(n) {
            return n != "";
          });

        // If the course is offered, return data
        if (season.length > 0 && section.length > 0)
          schedule[i] = {
            courseID: courses[0],
            quarters: season.map((i, el) => {
              return i[2];
            }),
            sections: section
          };
        // If the course is not offered, return blank data
        else {
          schedule[i] = {
            courseID: courses[0],
            quarters: [],
            sections: []
          };
        }
      });
      // Send data to a file in JSON
      fs.writeFile(
        "data/schedule.json",
        JSON.stringify(schedule, null, 4),
        err => {
          console.log("File successfully written");
        }
      );
    }
  });
};

// Check if ge exists
const checkGE = ge => {
  // Loop through JSON to find a match
  for (let i = 0; i < general.length; i++) {
    if (general[i].geID === ge.toUpperCase()) {
      return true;
    }
  }

  return false;
};

// Check if department exists by title
const checkDepartment = office => {
  // Loop through JSON to find a match
  for (let i = 0; i < branches.length; i++) {
    if (branches[i].title === office) {
      return true;
    }
  }

  return false;
};

// Check if course exists by courseID
const checkCourse = id => {
  // Loop through JSON to find a match
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].courseID === id.toUpperCase()) {
      return true;
    }
  }

  return false;
};

// Check if the course is offered
const checkSchedule = id => {
  // Loop through JSON to find a match
  for (let i = 0; i < schedules.length; i++) {
    if (schedules[i].courseID === id.toUpperCase()) {
      return schedules[i].quarters;
    }
  }

  return [];
};

module.exports = {
  getDepartments,
  getCourses,
  getSchedule,
  checkGE,
  checkDepartment,
  checkCourse,
  checkSchedule
};
