const { processFavourites } = require("../modules/processFavourites");

const favouriteCommandHandler = (bot) => {
  bot.onText(/\/favourites/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;
    const favourites = await processFavourites(bot, username, chatId);
  });
};

module.exports = { favouriteCommandHandler };
