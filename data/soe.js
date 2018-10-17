"use strict";

// Refer to test.js which handles testing for the web scraper

const axios = require("axios");
const cheerio = require("cheerio");
const cmps = "https://courses.soe.ucsc.edu/courses/cmps";

/* Use of scraper documentation can be found here:
 * https://www.npmjs.com/package/cheerio
 * https://www.npmjs.com/package/request-promise-native
*/

// Get all departments in SOE
const getDepartments = async () => {
  try {
    const res = await axios.get("https://courses.soe.ucsc.edu/");
    const html = res.data;
    const $ = cheerio.load(html);
    let departments = [];
    $("h2").map((i, elem) => {
      departments.push($(elem).text());
    });
    return departments;
  } catch (e) {
    console.log("error", e);
  }
};

// Get all courses in SOE
const getCourses = () => {
  axios
    .get("https://courses.soe.ucsc.edu/")
    .then(res => {
      if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        let courses = [];
        $("li").map((i, elem) => {
          courses.push($(elem).text());
        });
        return courses;
      }
    })
    .catch(e => console.log(e));
};

// Check if course exists by courseID
const checkCourse = title => {
  axios.get("https://courses.soe.ucsc.edu/").then(
    res => {
      if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        $("li").map((i, elem) => {
          let str = $(elem)
            .text()
            .split(":");
          if (title.toUpperCase() === str[0]) {
            return true;
          }
        });
        return false;
      }
    },
    err => console.log(err)
  );
};

// module.exports.quarterSchedule = course => {
//   let info = [];
//   const schedule = {};
//   rp(cmps)
//     .then(html => {
//       $(".course-name", html).map((i, elem) => {
//         let title = $(elem)
//           .children("a")
//           .text()
//           .split(":");
//         if (title[0].toUpperCase() === course.toUpperCase()) {
//           const info = $(elem)
//           .parent()
//           .next()
//           .children(".class")
//           .find("li")
//           .contents()
//           .text()
//           .split("\n")
//           info.map(el => {
//             if(el !==)
//           })
//           info.push();
//           console.log(info);
//           info.map(el => {

//           })
//         }
//       });
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };

module.exports = {
  getDepartments,
  getCourses,
  checkCourse
};
