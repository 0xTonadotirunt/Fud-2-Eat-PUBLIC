const { getPref } = require("../manager/Manager");

const sendRadiusMessage = (bot, chatId, prev = false) => {
  let message = "";

  if (prev) {
    message += `Thanks for sharing your location! Your latitude is ${getPref(
      username,
      "latitude"
    )} and your longitude is ${getPref(username, "longitude")}.\n\n`;
  }
  message += `How far are you willing to travel ? (in m) \n\nPlease enter a number between 0 and 50000.`;

  bot.sendMessage(chatId, `${message}`);
};

module.exports = { sendRadiusMessage };
