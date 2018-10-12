"use strict";

// Refer to test.js which handles testing for the web scraper

const rp = require("request-promise-native");
const $ = require("cheerio");
const url = "https://pisa.ucsc.edu/cs9/prd/sr9_2013/index.php";

// Gets all the terms available
module.exports.getTerms = () => {
  rp(url)
    .then(html => {
      $("#term_dropdown", html)
        .children()
        .map((i, elem) => {
          console.log(i, $(elem).html());
        })
        .get()
        .join(" ");
    })
    .catch(e => {
      console.log(e);
    });
};

// Gets all the subjects available
module.exports.getSubjects = () => {
  rp(url)
    .then(html => {
      $("#subject", html)
        .children()
        .map((i, elem) => {
          console.log(i, $(elem).html());
        })
        .get()
        .join(" ");
    })
    .catch(e => {
      console.log(e);
    });
};
