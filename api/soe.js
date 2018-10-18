"use strict";

// Refer to test.js which handles testing for the web scraper

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const classes = require("./data/courses.json");
const branches = require("./data/departments.json");
const general = require("./data/ge.json");

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

const getSchedule = () => {
  axios.get("https://courses.soe.ucsc.edu/courses/cmps").then(res => {
    if (res.status === 200) {
      const html = res.data;
      const $ = cheerio.load(html);
      const schedules = [];
      let offered = [];
      $(".course-name").map((i, elem) => {
        const title = $(elem)
          .children("a")
          .text()
          .trim();

        offered.push(
          $(elem)
            .parent()
            .next()
            .children(".class")
            .find("li")
            .children("a")
            .attr("href")
        );

        offered = offered.filter(function(n) {
          return n != null || undefined;
        });

        // Trying to figure out how to split string
        // to return a <course>/<quarter>/<section>
        offered = offered.filter(function(n) {
          let link = n.split("/");
          link = link.filter(function(q) {
            return q != "courses";
          });
          return n == link;
        });

        console.log(offered);

        const info = $(elem)
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

        schedules[i] = {
          course: title,
          quarters: info
        };
      });
      console.log(schedules);
    }
  });
};

module.exports = {
  getDepartments,
  getCourses,
  getSchedule,
  checkGE,
  checkDepartment,
  checkCourse
};
