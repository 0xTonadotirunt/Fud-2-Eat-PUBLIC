const { handlepriceLevel, generateStars } = require("./helper.js");
const { HandleOpenTimes } = require("./HandleOpenTimes.js");

const PrepareMessage = (result) => {
  let message = "";

  if (!result) {
    message = "Sorry, There was an issue with your request. Please try again.";
  } else {
    if (result.name) {
      message += `\n*Name*: \n${result.name}\n`;
    }

    if (result.editorial_summary && result.editorial_summary.overview) {
      message += `\n*Overview*: \n${result.editorial_summary.overview}\n`;
    }

    if (result.price_level) {
      message += `${handlepriceLevel(result.price_level)}`;
    }

    if (result.rating && result.user_ratings_total) {
      message += `\n${generateStars(result.rating)} ${
        result.user_ratings_total
      } ratings\n`;
    }

    if (result.formatted_address) {
      message += `\n*Address*: \n${result.formatted_address}\n`;
    }

    if (result.formatted_phone_number) {
      message += `\n*Phone Number*: ${result.formatted_phone_number} 📱\n`;
    }

    if (result.international_phone_number) {
      message += `\n*International Phone Number*: ${result.international_phone_number} 📞\n`;
    }

    if (result.website) {
      message += `\n*Website*: \n${result.website} 🌐\n`;
    }

    if (result.opening_hours && result.opening_hours.weekday_text) {
      message += "\n*Opening Hours*:\n";
      message += HandleOpenTimes(result.opening_hours.weekday_text);
    }

    // if (result.photos) {

    // }
    // boolean values

    // if (result.reviews) {
    // do sentiment analysis
    // }

    if (result.delivery) {
      message += `Delivery: ✅\n`;
    }
    if (result.dine_in) {
      message += `Dine In: ✅\n`;
    }
    if (result.serves_beer) {
      message += `Serves Beer: ✅\n`;
    }

    if (result.serves_dinner) {
      message += `Serves Dinner: ✅\n`;
    }

    if (result.serves_lunch) {
      message += `Serves Lunch: ✅\n`;
    }

    if (result.serves_breakfast) {
      message += `Serves Breakfast: ✅\n`;
    }

    if (result.reservable) {
      message += `Reservable: ✅\n`;
    }

    if (result.serves_vegetarian_food) {
      message += `Serves Vegetarian Food: ✅\n`;
    }

    if (result.serves_wine) {
      message += `Serves Wine: ✅\n`;
    }

    if (result.takeout) {
      message += `Takeout: ✅\n`;
    }
    if (result.curbside_pickup) {
      message += `Curbside Pickup: ✅\n`;
    }
    if (result.serves_brunch) {
      message += `Serves Brunch: ✅\n`;
    }
    if (result.wheelchair_accessible_entrance) {
      message += `Wheelchair Accessible Entrance: ✅\n`;
    }
    console.log("result is not null", message);
    return message;
  }
};

module.exports = { PrepareMessage };
