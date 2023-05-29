const sendTimeMessage = (bot, chatId) => {
  bot.sendMessage(
    chatId,
    `Please indicate the time duration you are willing to travel (in mins) (0 - 120).`,
    {
      reply_markup: {
        remove_keyboard: true,
      },
    }
  );
};

module.exports = { sendTimeMessage };
