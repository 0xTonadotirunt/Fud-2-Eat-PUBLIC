const { getFavourites } = require("../utils/userUtils");
const { sendMessageFavourites } = require("../helpers/sendMessageFavourites");

const processFavourites = async (bot, username, chatId) => {
  // get place ids from database
  const favourites = await getFavourites(username);

  if (!favourites.status) {
    bot.sendMessage(chatId, favourites.message);
    return;
  }
  const favourites_arr = favourites.data;

  let user_fav = [];

  for (let i = 0; i < favourites_arr.length; i++) {
    const name = favourites_arr[i].data.name;
    const id = favourites_arr[i].placeId;

    user_fav.push({ name: name, id: id });
  }

  // send message that displays the place name in inline keybaord
  sendMessageFavourites(bot, chatId, username, user_fav);
  return;

  // get place details from google maps api;
};

module.exports = { processFavourites };
