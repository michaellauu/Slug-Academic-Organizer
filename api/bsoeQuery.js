const schedule = require("./data/schedule.json");

module.exports.getClass = id => {
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].courseID === id.toUpperCase()) {
      return schedule[i];
    }
  }

  return "No class found";
};
