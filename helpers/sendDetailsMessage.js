const { MoreDetails } = require("../services/MoreDetails.js");
const { PrepareMessage } = require("../utils/PrepareMessage.js");

require("dotenv").config();

async function sendDetailsMessage(bot, chatId, place_id, payload = null) {
  res = await MoreDetails(place_id);

  if (!res) {
    return { status: false, message: "❌ No details found" };
  }

  if (res.status !== 200) {
    return { status: res.status, message: "❌ Error getting details" };
  }

  let resData;
  if (!payload) {
    resData = res.data;
  } else {
    resData = payload;
  }

  const message = PrepareMessage(resData);

  bot
    .sendMessage(chatId, `${message}`, { parse_mode: "Markdown" })
    .then(console.log("successfully sent additional message"))
    .catch(console.log("failed to send additional message"));

  if (res.photos) {
    // Print max 10 photos
    if (res.photos.length > 10) {
      res.photos = res.photos.slice(0, 10);
    }

    const media = res.photos.map((photo) => ({
      type: "photo",
      media: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GMAP_KEY}`,
    }));

    bot
      .sendMediaGroup(chatId, media)
      .then(() => {
        console.log("Photos sent successfully");
        // Resolve or perform any necessary actions after all photos are sent
      })
      .catch((error) => {
        console.log("Error sending photos:", error);
        // Reject or handle the error appropriately
      });
  }
}

module.exports = { sendDetailsMessage };
