const sendMessageFavourites = (bot, chatId, username, favourites) => {
  let message = "⭐️ Here are your favourites : \n\n";

  for (let i = 0; i < favourites.length; i++) {
    message += `${i + 1}. ${favourites[i].name}\n\n`;
  }

  message += "click on the restaurants below ⬇️ for more details ! ";

  bot.sendMessage(chatId, message, {
    reply_markup: {
      inline_keyboard: favourites.map((fav) => {
        return [
          {
            text: fav.name,
            callback_data: `getFav|${username}|${fav.id}`,
          },
        ];
      }),
    },
  });
};
module.exports = { sendMessageFavourites };
