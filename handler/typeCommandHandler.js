const typeCommandHandler = (bot) => {
  bot.onText(/\/foodtypes/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Here are some examples of food types: \n\n*Regional*\n\n Chinese \n\n Indian \n\n Italian \n\n Japanese \n\n Korean \n\n Mexican \n\n Thai \n\n Vietnamese \n\n*Categories*\n\n Fast Food\n\n Ramen\n\n Bibimbap\n\n Roti Prata ",
      { parse_mode: "Markdown" }
    );

    // setState(chatId, "foodchosen");
  });
};

module.exports = { typeCommandHandler };
