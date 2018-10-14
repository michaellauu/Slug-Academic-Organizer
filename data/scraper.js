"use strict";

// Refer to test.js which handles testing for the web scraper

const rp = require("request-promise-native");
const $ = require("cheerio");
const url = "https://courses.soe.ucsc.edu/";

/* Use of scraper documentation can be found here:
 * https://www.npmjs.com/package/cheerio
 * https://www.npmjs.com/package/request-promise-native
 * 
 * I chose request-promise-native so that it relies on 
 * native promises rather then Bluebird (idk what that is)
 * promises. Also, cheerio looks almost identical to jQuery,
 * so I chose it because of the simplicity. Using ES6 features.
*/

// Get all departments in SOE
module.exports.getDepartments = () => {
  rp(url)
    .then(html => {
      $("h2", html)
        .map((i, elem) => {
          console.log($(elem).text());
        })
        .get()
        .join(" ");
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
        .get()
        .join(" ");
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
