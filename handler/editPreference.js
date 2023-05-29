const { preferencesSettings } = require("../utils/preferencesSettings.js");

const editPreference = (bot, text, chatId, username) => {
  bot.sendMessage(chatId, `${text}`, preferencesSettings(username));
};

module.exports = { editPreference };
