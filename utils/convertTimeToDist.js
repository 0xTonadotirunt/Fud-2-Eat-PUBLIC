const { getPref } = require("../manager/Manager.js");

const convertTimeToDist = (username) => {
  // assume walking speed of 1.4 m/s
  // assume driving speed of 8.3333 m/s
  const DRIVING = 8.3333;
  const WALKING = 1.4;

  const time = getPref(username, "radius");

  if (getPref(username, "mode") === "walking") {
    return time * WALKING * 60;
  } else if (getPref(username, "mode") === "driving") {
    return time * DRIVING * 60;
  }
};

module.exports = { convertTimeToDist };
