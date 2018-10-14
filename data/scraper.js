"use strict";

// Refer to test.js which handles testing for the web scraper

const rp = require("request-promise-native");
const $ = require("cheerio");
const url = "https://courses.soe.ucsc.edu/";

module.exports.getDepartments = () => {
  rp(url)
    .then(html => {
      $("h2", html)
        .map((i, elem) => {
          console.log(i, $(elem).text());
        })
        .get()
        .join(" ");
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports.getCourses = () => {
  rp(url)
    .then(html => {
      $("li", html)
        .map((i, elem) => {
          console.log(i, $(elem).text());
        })
        .get()
        .join(" ");
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports.checkCourse = title => {
  rp(url)
    .then(html => {
      $("li", html)
        .map((i, elem) => {
          let str = $(elem)
            .text()
            .split(":");
          if (title.toUpperCase() === str[0]) {
            return true;
          }
        })
        .get()
        .join(" ");
    })
    .catch(e => {
      console.log(e);
    });

  return false;
};

// WE CAN COME BACK TO THIS METHOD IF WE FIND IT MORE HELPFUL
// ILL TRY TO EXPLAIN THIS OTHER APPROACH
// // Gets all the terms available
// module.exports.getTerms = () => {
//   rp(baseURL)
//     .then(html => {
//       $("#term_dropdown", html)
//         .children()
//         .map((i, elem) => {
//           console.log(i, $(elem).html());
//         })
//         .get()
//         .join(" ");
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };

// // Gets all the subjects available
// module.exports.getSubjects = () => {
//   rp(baseURL)
//     .then(html => {
//       $("#subject", html)
//         .children()
//         .map((i, elem) => {
//           console.log(i, $(elem).html());
//         })
//         .get()
//         .join(" ");
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };

// // Gets all the contents of listed [OPEN] classes
// module.exports.getClasses = () => {
//   rp(baseURL)
//     .then(html => {
//       console.log(
//         $("div > .panel-heading-custom", html)
//           .contents()
//           .html()
//       );
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };
