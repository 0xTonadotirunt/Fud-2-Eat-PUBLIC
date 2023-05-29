const axios = require("axios");
const { getPref } = require("../manager/Manager.js");
const { convertTimeToDist } = require("../utils/convertTimeToDist.js");
require("dotenv").config();

const recommendation = async (username) => {
  const user_prefs = getPref(username, "all");
  let distance = "";

  // convert time to distance
  if (user_prefs["distancetype"] === "time") {
    distance = convertTimeToDist(username);
    // replace radius with distance with abit of buffer
  }

  try {
    // if (!type) {
    //   type = "food";
    // }
    if (user_prefs["closest"]) {
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${user_prefs["latitude"]},${user_prefs["longitude"]}&radius=${distance}&keyword=food&key=${process.env.GMAP_KEY}&opennow=${user_prefs["openboolean"]}`;
    } else if (user_prefs["distancetype"] === "distance") {
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${user_prefs["latitude"]},${user_prefs["longitude"]}&radius=${user_prefs["radius"]}&keyword=${user_prefs["type"]}&key=${process.env.GMAP_KEY}&type=food&opennow=${user_prefs["openboolean"]}`;
    } else if (user_prefs["distancetype"] === "time") {
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${user_prefs["latitude"]},${user_prefs["longitude"]}&radius=${distance}&keyword=${user_prefs["type"]}&key=${process.env.GMAP_KEY}&type=food&opennow=${user_prefs["openboolean"]}`;
    }

    const response = await axios.get(url);

    // filter out results that does not have food or restaurant in type
    const filtered = response.data.results.filter((result) => {
      return (
        result.types.includes("food") || result.types.includes("restaurant")
      );
    });

    const recommendations = filtered.map((result) => ({
      name: result.name,
      rating: result.rating,
      address: result.vicinity,
      //   price_level: result.price_level,
      open_now: result.opening_hours ? result.opening_hours.open_now : null,
      opening_hours: result.opening_hours || null,
      photo_reference: result.photos,
      geometry: result.geometry,
      user_ratings_total: result.user_ratings_total,
      place_id: result.place_id,
    }));

    return recommendations;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { recommendation };
