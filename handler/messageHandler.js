const {
  getState,
  getPref,
  setPref,
  setState,
} = require("../manager/Manager.js");

const { sendFoodTypeMessage } = require("../helpers/sendFoodTypeMessage.js");

const { sendRadiusMessage } = require("../helpers/sendRadiusMessage.js");

const { getRandomFoodType } = require("../utils/getRandomFoodType.js");

const { sendTimeMessage } = require("../helpers/sendTimeMessage.js");

const {
  sendTransportModeMessage,
} = require("../helpers/sendTransportModeMessage.js");

const {
  processRecommendation,
} = require("../modules/processRecommendation.js");

const { editPreference } = require("./editPreference.js");

const {
  sendConfirmationMessage,
} = require("../helpers/sendConfirmationMessage.js");

const messageStateHandler = (bot) => {
  bot.on("message", (msg) => {
    if (
      msg.text == "/start" ||
      msg.text === "/foodtypes" ||
      msg.text === "/hangry"
    ) {
      return;
    }

    const chatId = msg.chat.id;
    const username = msg.chat.username;
    state = getState(username);

    if (state === "immediate") {
      return;
    }

    if (state === "distance") {
      if (msg.text > 50000 || msg.text < 0 || isNaN(msg.text)) {
        sendRadiusMessage(bot, chatId);
      } else {
        bot.sendMessage(
          chatId,
          `Please enter a type of food you would like to eat. \n\nif you would like to see examples of food types, please type /foodtypes. \n\nif you are not sure what you want to eat, please type "random".`,
          {
            reply_markup: {
              keyboard: [[{ text: "/foodtypes" }, { text: "random" }]],
              resize_keyboard: true,

              one_time_keyboard: true,
            },
          }
        );

        setState(chatId, username, "foodchosen");

        setPref(chatId, username, "radius", msg.text);
      }
    } else if (state === "time") {
      if (msg.text > 120 || msg.text < 0 || isNaN(msg.text)) {
        sendTimeMessage(bot, chatId);
      } else {
        bot.sendMessage(
          chatId,
          `Please enter a type of food you would like to eat. \n\nif you would like to see examples of food types, please type /foodtypes. \n\nif you are not sure what you want to eat, please type "random".`,
          {
            reply_markup: {
              keyboard: [[{ text: "/foodtypes" }, { text: "random" }]],
              resize_keyboard: true,

              one_time_keyboard: true,
            },
          }
        );

        setState(chatId, username, "foodchosen");

        setPref(chatId, username, "radius", msg.text);
      }
    } else if (state === "foodchosen") {
      // if message is random (account for casing), then send random food type

      if (msg.text.toLowerCase() === "random") {
        // send random food type
        foodtype = getRandomFoodType();
        setPref(chatId, username, "type", foodtype);
        sendFoodTypeMessage(bot, chatId, username, true);
      } else {
        foodtype = msg.text.toLowerCase();
        setPref(chatId, username, "type", foodtype);
        sendFoodTypeMessage(bot, chatId, username);
      }

      // bot.sendMessage(
      //   chatId,
      //   `Thanks for sharing your food type! Your food type is ${
      //     foodtype.charAt(0).toUpperCase() + foodtype.slice(1)
      //   }. \n\nWhat is the maximum number of recommendations that you want to see ? `,
      //   {
      //     parse_mode: "Markdown",
      //     reply_markup: {
      //       keyboard: [
      //         [{ text: "1" }],
      //         [{ text: "2" }],
      //         [{ text: "3" }],
      //         [{ text: "4" }],
      //         [{ text: "5" }],
      //       ],
      //       resize_keyboard: true,
      //       one_time_keyboard: true,
      //     },
      //   }
      // );
      // const recommendations = async () => {};

      setState(chatId, username, "numplaces");
    } else if (state === "confirmquery") {
      if (msg.text.toLowerCase() == "yes") {
        // AXIOS CALL TO GMAP PLACES API
        processRecommendation(bot, chatId, username);

        setState(chatId, username, "completequery");

        // query based on max number of recommendations and open now
      } else if (msg.text.toLowerCase() == "no") {
        editPreference(
          bot,
          "which option do you want to change ? ",
          chatId,
          username
        );
      } else {
        bot.sendMessage(chatId, "Please enter a valid response");
      }
    } else if (state === "numplaces") {
      if (msg.text.toLowerCase() === "reroll") {
        foodtype = getRandomFoodType();
        setPref(chatId, username, "type", foodtype);
        sendFoodTypeMessage(bot, chatId, username, true);
        return;
      }
      if (msg.text > 5 || msg.text < 0 || isNaN(msg.text)) {
        bot.sendMessage(
          chatId,
          "Please enter a valid number of recommendations"
        );
        return;
      }

      setPref(chatId, username, "numplaces", msg.text);
      bot.sendMessage(chatId, "Do you only want to see open places?", {
        reply_markup: {
          keyboard: [[{ text: "Yes" }], [{ text: "No" }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
      setState(chatId, username, "openboolean");
    } else if (state === "openboolean") {
      if (msg.text.toLowerCase() === "yes") {
        setPref(chatId, username, "openboolean", true);
      } else if (msg.text.toLowerCase() === "no") {
        setPref(chatId, username, "openboolean", false);
      } else {
        bot.sendMessage(chatId, "Please enter a valid response");
        return;
      }

      // confirm query
      sendConfirmationMessage(bot, chatId, username);
    } else if (state === "mode") {
      // if yes set pref to true else false
      if (msg.text.toLowerCase() === "driving") {
        setPref(chatId, username, "mode", "driving");
      } else if (msg.text.toLowerCase() === "walking") {
        setPref(chatId, username, "mode", "walking");
      } else if (msg.text.toLowerCase() === "public transport") {
        setPref(chatId, username, "mode", "transit");
      } else if (msg.text.toLowerCase() === "cycling") {
        setPref(chatId, username, "mode", "bicycling");
      } else {
        bot.sendMessage(chatId, "Please enter a valid mode of transportation");
        return;
      }

      // check if distancetype is distance or time
      const distancetype = getPref(username, "distancetype");

      if (distancetype === "distance") {
        sendRadiusMessage(bot, chatId);
        setState(chatId, username, "distance");
      } else if (distancetype === "time") {
        sendTimeMessage(bot, chatId);
        setState(chatId, username, "time");
      }
    } else if (state === "distancetype") {
      if (
        msg.text.toLowerCase() !== "distance" &&
        msg.text.toLowerCase() !== "time"
      ) {
        bot.sendMessage(chatId, "Please enter a valid response");
        return;
      }
      setPref(chatId, username, "distancetype", msg.text.toLowerCase());

      sendTransportModeMessage(bot, chatId);

      setState(chatId, username, "mode");
    }
  });
};

const messageModificationHandler = (bot) => {
  bot.on("message", (msg) => {
    if (
      msg.text == "/start" ||
      msg.text === "/foodtypes" ||
      msg.text === "/hangry"
    ) {
      return;
    }

    const chatId = msg.chat.id;
    const username = msg.chat.username;
    const state = getState(username);

    switch (state) {
      case "modify_location":
        setPref(chatId, username, "latitude", msg.location.latitude);
        setPref(chatId, username, "longitude", msg.location.longitude);
        sendConfirmationMessage(
          bot,
          chatId,
          username,
          getPref(username, "all")
        );
        break;
      case "modify_distance":
        if (
          (getPref(username, "distancetype") === "distance") &
            (isNaN(msg.text) || msg.text < 0 || msg.text > 50000) ||
          (getPref(username, "distancetype") === "time") &
            (isNaN(msg.text) || msg.text < 0 || msg.text > 120)
        ) {
          bot.sendMessage(chatId, "Please enter a valid number");
          return;
        }
        setPref(chatId, username, "radius", msg.text);
        sendConfirmationMessage(
          bot,
          chatId,
          username,
          getPref(username, "all")
        );
        break;

      case "modify_type":
        if (msg.text.toLowerCase() === "/foodtypes") {
          break;
        }
        setPref(chatId, username, "type", msg.text);
        sendConfirmationMessage(
          bot,
          chatId,
          username,
          getPref(username, "all")
        );
        break;
      case "modify_numplaces":
        if (isNaN(msg.text) || msg.text < 0 || msg.text > 5) {
          bot.sendMessage(chatId, "Please enter a valid number");
          return;
        }
        setPref(chatId, username, "numplaces", msg.text);
        sendConfirmationMessage(
          bot,
          chatId,
          username,
          getPref(username, "all")
        );
        break;
      case "modify_openboolean":
        if (msg.text === "Yes") {
          setPref(chatId, username, "openboolean", true);
        } else if (msg.text === "No") {
          setPref(chatId, username, "openboolean", false);
        } else {
          bot.sendMessage(chatId, "Please enter a valid option");
          return;
        }

        sendConfirmationMessage(
          bot,
          chatId,
          username,
          getPref(username, "all")
        );
        break;

      case "modify_mode":
        if (msg.text === "Driving") {
          setPref(chatId, username, "mode", "driving");
        } else if (msg.text === "Walking") {
          setPref(chatId, username, "mode", "walking");
        } else {
          bot.sendMessage(
            chatId,
            "Please enter a valid mode of transportation"
          );
          return;
        }
        sendConfirmationMessage(
          bot,
          chatId,
          username,
          getPref(username, "all")
        );
        break;

      case "modify_distancetype":
        setPref(chatId, username, "distancetype", msg.text.toLowerCase());
        // sendConfirmationMessage(
        //   bot,
        //   chatId,
        //   username,
        //   getPref(username, "all")
        // );
        if (getPref(username, "distancetype") === "distance") {
          sendRadiusMessage(bot, chatId);
        } else if (getPref(username, "distancetype") === "time") {
          sendTimeMessage(bot, chatId);
        }
        setState(chatId, username, "modify_distance");
    }
  });
};

module.exports = { messageStateHandler, messageModificationHandler };
