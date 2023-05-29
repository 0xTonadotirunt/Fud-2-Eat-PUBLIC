const { ConfirmationMessage } = require("../utils/ConfirmationMessage.js");
const { getPref, setState } = require("../manager/Manager.js");

function sendConfirmationMessage(bot, chatId, username) {
  const user_prefs = getPref(username, "all");

  bot.sendMessage(chatId, `${ConfirmationMessage(user_prefs)}`, {
    reply_markup: {
      keyboard: [[{ text: "Yes" }], [{ text: "No" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
    parse_mode: "Markdown",
  });

  setState(chatId, username, "confirmquery");
}

module.exports = { sendConfirmationMessage };
