const { setState } = require("../manager/Manager.js");

const hungryCommandHandler = (bot) => {
  bot.onText(/\/hangry/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;

    bot.sendMessage(
      chatId,
      "🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\nOh NOOOOOO. a hungry person is a dangerous person. \n\n Please share your location with me and I will recommend you some food options IMMEDIATELY\n🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨",
      {
        reply_markup: {
          keyboard: [[{ text: "Share Location", request_location: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );

    setState(chatId, username, "immediate");
  });
};

module.exports = { hungryCommandHandler };
