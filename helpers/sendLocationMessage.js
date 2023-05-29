require("dotenv").config();

async function sendLocationMessage(bot, chatId, message, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      await bot.sendMessage(chatId, `${message}`, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "More Details",
                callback_data: `details|${payload.place_id}`,
              },
            ],
            [
              {
                text: "Find on Map",
                callback_data: `coordinates, ${payload.geometry.location.lat}, ${payload.geometry.location.lng}`,
              },
            ],
            [
              {
                text: "Add to Favourites",
                callback_data: `addFav|${payload.place_id}`,
              },
            ],
          ],
        },
        parse_mode: "Markdown",
      });

      if (payload.photo_reference) {
        for (let i = 0; i < payload.photo_reference.length; i++) {
          await bot.sendPhoto(
            chatId,
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${payload.photo_reference[i].photo_reference}&key=${process.env.GMAP_KEY}`
          );
        }
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { sendLocationMessage };
