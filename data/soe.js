"use strict";

// Refer to test.js which handles testing for the web scraper

const rp = require("request-promise-native");
const $ = require("cheerio");
const url = "https://courses.soe.ucsc.edu/";

/* Use of scraper documentation can be found here:
 * https://www.npmjs.com/package/cheerio
 * https://www.npmjs.com/package/request-promise-native
*/

// Get all departments in SOE
module.exports.getDepartments = () => {
  rp(url)
    .then(html => {
      $("h2", html)
        .map((i, elem) => {
          console.log($(elem).text());
        })
        .get();
    })
    .catch(e => {
      console.log(e);
    });
};

// Get all courses in SOE
module.exports.getCourses = () => {
  rp(url)
    .then(html => {
      $("li", html)
        .map((i, elem) => {
          console.log($(elem).text());
        })
        .get();
    })
    .catch(e => {
      console.log(e);
    });
};

// Check if course exists by courseID
module.exports.checkCourse = title => {
  rp(url)
    .then(html => {
      $("li", html).map((i, elem) => {
        let str = $(elem)
          .text()
          .split(":");
        if (title.toUpperCase() === str[0].toUpperCase()) {
          return true, console.log("Course is valid");
        }
      });

      return false, console.log("Course invalid");
    })
    .catch(e => {
      console.log(e);
    });
};
