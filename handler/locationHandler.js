const {
  getState,
  getPref,
  setPref,
  setState,
} = require("../manager/Manager.js");
const {
  processRecommendation,
} = require("../modules/processRecommendation.js");

const {
  sendDistanceTypeMessage,
} = require("../helpers/sendDistanceTypeMessage.js");

const { sendRadiusMessage } = require("../helpers/sendRadiusMessage.js");

const locationHandler = (bot) => {
  bot.on("location", (msg) => {
    // Get the latitude and longitude of the location

    const chatId = msg.chat.id;
    const username = msg.chat.username;
    setPref(chatId, username, "latitude", msg.location.latitude);
    setPref(chatId, username, "longitude", msg.location.longitude);
    state = getState(username);

    if (state === "immediate") {
      // set range to max , open now to true, numplaces to 3, type to random
      setPref(chatId, username, "radius", 15);
      setPref(chatId, username, "openboolean", true);
      setPref(chatId, username, "numplaces", 5);
      setPref(chatId, username, "type", "");
      setPref(chatId, username, "mode", "walking");
      setPref(chatId, username, "distancetype", "time");
      setPref(chatId, username, "closest", true);
      processRecommendation(bot, chatId, username);
      return;
    }
    // Send a message to the user with their location
    if (state === "location") {
      sendDistanceTypeMessage(bot, chatId);

      setState(chatId, username, "distancetype");
    }

    // Listen for a message from the user

    // display array of locations using GMAPS nearby search
  });
};

module.exports = { locationHandler };
