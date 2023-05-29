const { getPref } = require("../manager/Manager");

const preferencesSettings = (username) => {
  const distancetype = getPref(username, "distancetype");

  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: "location", callback_data: "location" }],
        distancetype === "distance"
          ? [{ text: "distance", callback_data: "distance" }]
          : [{ text: "time", callback_data: "time" }],
        [{ text: "food type", callback_data: "choosefood" }],
        [
          {
            text: "max number of recommendations",
            callback_data: "numplaces",
          },
        ],
        [{ text: "open now", callback_data: "openboolean" }],
        [{ text: "mode of transport", callback_data: "mode" }],
        [
          {
            text: "Measure by distance or time",
            callback_data: "distancetype",
          },
        ],
      ],
    },
  };
};

module.exports = { preferencesSettings };
