const { sendDetailsMessage } = require("../helpers/sendDetailsMessage.js");
const { sendRadiusMessage } = require("../helpers/sendRadiusMessage.js");
const { setState } = require("../manager/Manager.js");
const { sendTimeMessage } = require("../helpers/sendTimeMessage.js");

const { addToFavourites, getFavouritesById } = require("../utils/userUtils.js");

const {
  sendDistanceTypeMessage,
} = require("../helpers/sendDistanceTypeMessage.js");

const {
  sendTransportModeMessage,
} = require("../helpers/sendTransportModeMessage.js");

const callbackHandler = (bot) => {
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    const message_text = query.message.text;
    const username = query.message.chat.username;

    // handle "coordinates, lat, lng"
    if (data.includes("coordinates")) {
      const info = data.split(", ");
      const lat = info[1];
      const lng = info[2];
      bot.sendLocation(chatId, lat, lng);
    }

    // handle "details, place_id"

    if (data.includes("details")) {
      const place_id = data.split("|")[1];
      // make axios call to get more information'
      try {
        sendDetailsMessage(bot, chatId, place_id);
      } catch (err) {
        console.log(err);
      }
    }

    if (data.includes("addFav")) {
      const place_id = data.split("|")[1];
      const response = await addToFavourites(username, place_id);
      bot.sendMessage(chatId, `${response.message}`);
    }

    if (data.includes("getFav")) {
      const place_id = data.split("|")[2];
      const username = data.split("|")[1];

      // get from db and send details message
      const response = await getFavouritesById(username, place_id);

      if (!response.status) {
        bot.sendMessage(chatId, `${response.message}`);
      }

      const place = response.data;
      sendDetailsMessage(bot, chatId, place.placeId, place.data);
    }

    // add to favourites in db

    // Handle the callback data based on the button pressed
    switch (data) {
      case "location":
        // loop back to state: location
        setState(chatId, username, "modify_location");
        bot.sendMessage(
          chatId,

          "Please share your location with me and I will recommend you some food options nearby.",
          {
            reply_markup: {
              keyboard: [[{ text: "Share Location", request_location: true }]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          }
        );

        break;
      case "distance":
        // loop back to state: distance
        setState(chatId, username, "modify_distance");
        sendRadiusMessage(bot, chatId);
        break;

      case "time":
        setState(chatId, username, "modify_distance");
        sendTimeMessage(bot, chatId);
        break;
      case "choosefood":
        // loop back to state: choosefood
        setState(chatId, username, "modify_type");
        bot.sendMessage(
          chatId,
          `Please enter a type of food you would like to eat. if you would like to see examples of food types, please type /foodtypes. if you are not sure what you want to eat, please type "random".`,
          {
            reply_markup: {
              keyboard: [[{ text: "/foodtypes" }, { text: "Random" }]],
              resize_keyboard: true,

              one_time_keyboard: true,
            },
          }
        );

        break;

      case "numplaces":
        setState(chatId, username, "modify_numplaces");
        bot.sendMessage(
          chatId,
          `what is the maximum number of recommendations that you want to see ? `,
          {
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
          }
        );
        // const recommendations = async () => {};

        break;

      case "openboolean":
        setState(chatId, username, "modify_openboolean");
        bot.sendMessage(chatId, "Do you only want to see open places?", {
          reply_markup: {
            keyboard: [[{ text: "Yes" }], [{ text: "No" }]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });

        break;

      // display map based on location
      case "mode":
        setState(chatId, username, "modify_mode");
        sendTransportModeMessage(bot, chatId);
        break;

      case "distancetype":
        sendDistanceTypeMessage(bot, chatId);
        setState(chatId, username, "modify_distancetype");

        break;

      case "reroll":
        foodtype = getRandomFoodType();
        setState(chatId, username, "foodchosen");
        sendFoodTypeMessage(bot, chatId, username, true);

        break;

      default:
        break;
    }

    // Answer the callback query to remove the "loading" status from the button
    bot.answerCallbackQuery(query.id);
  });
};

module.exports = { callbackHandler };
