// 5177558051:AAEy2icluMBfCSlaWK4y9wWeDO-rLw33PCw
const TelegramBot = require("node-telegram-bot-api");

const { getState, getPref } = require("./manager/Manager.js");
const { startCommandHandler } = require("./handler/startCommandHandler.js");
const { typeCommandHandler } = require("./handler/typeCommandHandler.js");
const { hungryCommandHandler } = require("./handler/hungryCommandHandler.js");
const { locationHandler } = require("./handler/locationHandler.js");
const {
  favouriteCommandHandler,
} = require("./handler/favouriteCommandHandler.js");

const {
  messageStateHandler,
  messageModificationHandler,
} = require("./handler/messageHandler.js");

const { callbackHandler } = require("./handler/callbackHandler.js");

// handle mongoose and mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

require("dotenv").config();

const token = process.env.TELE_KEY;

// create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true,
});

bot.setMyCommands([
  {
    command: "/start",
    description: "Start the bot",
  },
  {
    command: "/foodtypes",
    description: "Find food type examples (not restrictive!)",
  },
  {
    command: "/hangry",
    description: "Find food near you QUICK!",
  },
  {
    command: "/favourites",
    description: "Your saved favourites!",
  },
]);

bot.on("polling_error", console.log);

bot.on("message", (msg) => {
  const username = msg.chat.username;
  console.log(getPref(username, "all"));
  console.log(getState(username));

  debugger;
});

// Matches "/start" command
startCommandHandler(bot);

// Matches "/foodtype" command
typeCommandHandler(bot);

// Matches "/hangry" command
hungryCommandHandler(bot);

// Matches "/favourites" command
favouriteCommandHandler(bot);

// Listens for location messages
locationHandler(bot);

// Listens for messages
messageStateHandler(bot);

// Listens for messages
messageModificationHandler(bot);

// Listens for callback queries
callbackHandler(bot);
