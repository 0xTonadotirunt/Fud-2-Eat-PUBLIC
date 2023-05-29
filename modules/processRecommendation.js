const { QueryUserPref } = require("./QueryUserPref.js");
const { recommendation } = require("../services/NearbyPlaces.js");
const {
  sendLocationMessageInOrder,
} = require("../helpers/sendLocationMessageInOrder.js");
const { getPref } = require("../manager/Manager.js");
const { editPreference } = require("../handler/editPreference.js");

async function processRecommendation(bot, chatId, username) {
  try {
    const nearbyPlaces = await recommendation(username);

    const payload = await QueryUserPref(nearbyPlaces, username);

    // account for array empty
    if (payload.length == 0) {
      // `Sorry, there are no recommendations for you 😞. Please try again with different preferences !`,
      editPreference(
        bot,
        `Sorry, there are no recommendations for you 😞. Please try again with different preferences !`,
        chatId,
        username
      );
    } else {
      await sendLocationMessageInOrder(bot, chatId, payload, username);
      editPreference(
        bot,
        "Are you satisfied with your results ? \n\nChange your search fields below!",
        chatId,
        username
      );
      console.log("All payload sent successfully");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { processRecommendation };
