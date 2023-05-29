const sendDistanceTypeMessage = (bot, chatId) => {
  bot.sendMessage(
    chatId,
    `How would you prefer to measure the distance? Using the metric of physical distance or by considering the time taken to travel?`,
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Distance",
            },
            {
              text: "Time",
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
};

module.exports = { sendDistanceTypeMessage };
