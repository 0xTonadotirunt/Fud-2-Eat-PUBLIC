const { addUserOnStart } = require("../utils/userUtils.js");
const { setState, setPref } = require("../manager/Manager.js");

const startCommandHandler = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    // reset prefs
    setPref(chatId, username, "reset");

    setState(chatId, username, "start");
    addUserOnStart(chatId, username);

    bot.sendMessage(
      chatId,

      "Welcome to Fud2Eat. Get recommendations for nearby food options ! 🥩🍣🍙🍟 \n\nPlease share your location 📍 with me and I will recommend you some food options nearby.",
      {
        reply_markup: {
          keyboard: [[{ text: "Share Location", request_location: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
    // addUserOnStart(chatId, msg.chat.username);
    await setState(chatId, username, "location");
  });
};

module.exports = { startCommandHandler };
