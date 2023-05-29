// query based on max number of recommendations and open now

const { FindDistanceTime } = require("../services/FindDistanceTime");
const { getPref } = require("../manager/Manager.js");

const QueryUserPref = async (payload, username) => {
  // open, max, distance, mode
  user_prefs = getPref(username, "all");
  let ret = [];
  if (user_prefs["openboolean"]) {
    payload = payload.filter((place) => place.open_now === true);
  }

  // for each entry in payload, calculate distance and time to travel from user's location
  let place = "";
  let dist_time = "";

  for (let i = 0; i < payload.length; i++) {
    place = payload[i];
    try {
      dist_time = await FindDistanceTime(
        { lat: user_prefs["latitude"], lng: user_prefs["longitude"] },
        place.place_id,
        user_prefs["mode"]
      );
    } catch (error) {
      console.log(error);
    }

    if (
      (dist_time.distance.value < user_prefs["radius"] &&
        user_prefs["distancetype"] === "distance") ||
      (dist_time.duration.value < user_prefs["radius"] * 60 &&
        user_prefs["distancetype"] === "time")
    ) {
      // if distance is less than user's preference, add distance and time to the object
      place["distance"] = dist_time.distance;
      place["duration"] = dist_time.duration;
      // add the object to the array
      ret.push(place);

      if (ret.length == user_prefs["numplaces"]) {
        // if the array is equal to max, sort the array based on distance and return the array
        ret.sort((a, b) => a.distance.value - b.distance.value);

        return ret;
      }

      // after the loop, sort the array and return the array
    }
  }
  ret.sort((a, b) => a.distance.value - b.distance.value);

  return ret;
};

module.exports = { QueryUserPref };
