// helper function generate stars as rating
const { generateStars, generateOpenNow } = require("./helper.js");

// helper function to generate emoji for open now

// helper function to parse payload into human readable message

const DisplayMessage = async (payload, mode) => {
  const name = payload.name;
  const rating = payload.rating;
  const address = payload.address;
  const open_now = payload.open_now;
  // const opening_hours = payload.opening_hours;
  // const photo_reference = payload.photo_reference;
  // const geometry = payload.geometry;
  const user_ratings_total = payload.user_ratings_total;
  let message = "";

  // generate distance and time based on coordinates

  try {
    // const distance_time_walk = await FindDistanceTime(
    //   user_coords,
    //   place_id,
    //   "walking"
    // );

    // const distance_time_drive = await FindDistanceTime(
    //   user_coords,
    //   place_id,
    //   "driving"
    // );

    message = `*Name*: ${name}\n*Rating* : ${generateStars(
      rating
    )} ${user_ratings_total} ratings\n*Address*: ${address}\n*Open Now*: ${generateOpenNow(
      open_now
    )}`;

    if (mode == "driving") {
      message += `\n\n*Distance* : ${payload.distance.text}\n\n*Drive time* : ${payload.duration.text}🚗`;
    }

    if (mode == "walking") {
      message += `\n\n*Distance* : ${payload.distance.text}\n\n*Walk time* : ${payload.duration.text}🚶‍♂️`;
    }

    if (mode == "transit") {
      message += `\n\n*Distance* : ${payload.distance.text}\n\n*Transit time* : ${payload.duration.text}🚆`;
    }
    if (mode == "bicycling") {
      message += `\n\n*Distance* : ${payload.distance.text}\n\n*Bicycle time* : ${payload.duration.text}🚴‍♂️`;
    }

    return message;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DisplayMessage };
