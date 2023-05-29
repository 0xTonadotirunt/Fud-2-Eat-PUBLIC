const { DisplayMessage } = require("../utils/DisplayMessage.js");

const { sendLocationMessage } = require("./sendLocationMessage.js");

const { getPref } = require("../manager/Manager.js");

async function sendLocationMessageInOrder(bot, chatId, payload, username) {
  await bot.sendMessage(
    chatId,
    `Thanks for confirming! Here are some recommendations for you.`,
    { reply_markup: { remove_keyboard: true } }
    // remove keyboard
  );

  for (i = 0; i < payload.length; i++) {
    const message = await DisplayMessage(payload[i], getPref(username, "mode"));

    await sendLocationMessage(bot, chatId, `${i + 1}.\n${message}`, payload[i]);
  }
}

module.exports = { sendLocationMessageInOrder };
