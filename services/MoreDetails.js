const axios = require("axios");
require("dotenv").config();

const MoreDetails = async (place_id) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GMAP_KEY}&place_id=${place_id}`
    );
    return { status: response.status, data: response.data.result };
  } catch (error) {
    console.log(error);

    return { status: response.status, message: "❌ Error getting details" };
  }
};

module.exports = { MoreDetails };
