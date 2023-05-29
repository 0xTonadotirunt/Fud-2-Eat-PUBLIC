const axios = require("axios");
require("dotenv").config();

const FindDistanceTime = async (userCoords, place_id, mode) => {
  // takes in user coordinates, place id and mode of transport
  // uses the googlemaps distance matrix api to calculate distance and time required to get to place
  // returns an object with distance and duration
  // distance is an object with text and value
  // duration is an object with text and value

  let url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=place_id:${place_id}&origins=${userCoords.lat},${userCoords.lng}
  &mode=${mode}&key=${process.env.GMAP_KEY}`;
  try {
    const response = await axios.get(url);
    const distance = response.data.rows[0].elements[0].distance;
    const duration = response.data.rows[0].elements[0].duration;

    return { distance, duration };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { FindDistanceTime };
