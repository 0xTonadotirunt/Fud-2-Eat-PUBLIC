const { getPref } = require("../manager/Manager.js");
const sendFoodTypeMessage = (bot, chatId, username, reroll = false) => {
  let options = {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: [
        [{ text: "1" }],
        [{ text: "2" }],
        [{ text: "3" }],
        [{ text: "4" }],
        [{ text: "5" }],
      ],

      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  if (reroll) {
    options.reply_markup.keyboard.push([
      { text: "Reroll", callback_data: "reroll" },
    ]);
  }

  const foodtype = getPref(username, "type");
  bot.sendMessage(
    chatId,
    `Thanks for sharing your food type! Your food type is ${
      foodtype.charAt(0).toUpperCase() + foodtype.slice(1)
    }. \n\nWhat is the maximum number of recommendations that you want to see ? `,
    options
  );
};

module.exports = { sendFoodTypeMessage };
