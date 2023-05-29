const sendTransportModeMessage = (bot, chatId) => {
  bot.sendMessage(chatId, `What is your mode of transport?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Driving" }, { text: "Walking" }],
        [{ text: "Public Transport" }, { text: "Cycling" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
};

module.exports = { sendTransportModeMessage };
