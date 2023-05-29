# Fud2Eat Documentation

Fud2Eat is a Telegram bot that provides recommendations for nearby food options based on user preferences. The bot uses the Google Maps Places API to retrieve information about nearby places and displays them to the user.

## Getting Started

To use Fud2Eat, you need to have a Telegram account. Follow these steps to get started:

1. Search for the Fud2Eat bot on Telegram (@chuse_food_bot) or click on the following link: [Fud2Eat Bot](https://t.me/chuse_food_bot)
2. Start a conversation with the bot by clicking on the "Start" button or sending the "/start" command.
3. The bot will ask you to share your location. Click on the "Share Location" button to provide your location information.

## Bot Commands

Fud2Eat bot supports the following commands:

- /start: Start the bot and initiate the conversation.
- /foodtypes: Get examples of food types to choose from.
- /hangry: Get immediate food recommendations.
- /favourites: Get saved favourites

### Features

#### Finding Nearby Food Options

Once you have shared your location with the bot, it will ask you to provide additional preferences:

1. **Distance**: The bot will ask you to specify how far you are willing to travel for food. Enter a number between 0 and 5000 (in meters).
2. **Food Type**: Enter a specific type of food you would like to eat or type "random" if you're not sure. You can also use the "/foodtypes" command to get examples of food types.
3. **Number of Recommendations**: Specify the maximum number of recommendations you want to see. Choose a number between 1 and 5.

4. **Open Now**: The bot will ask if you want to see only places that are currently open. You can choose "Yes" or "No".
   After providing these preferences, the bot will process your request and provide a list of recommended food options based on your preferences.

#### Viewing Recommendations

The bot will display the recommendations as messages in the chat. Each recommendation includes the following information:

- Name: The name of the place.
- Rating: The rating of the place.
- Address: The address of the place.
- Open Now: Indicates if the place is currently open.

For each recommendation, you can also perform the following actions:

- More Details: Click on the "More Details" button to get additional information about the place, such as - - opening hours, phone number, and website.

- Find on Map: Click on the "Find on Map" button to view the location of the place on a map.

- Save to favourites: accessible by using the command /favourites

#### Additional Actions

- Random Food Types: If you're not sure what type of food you want to eat, you can use the "/foodtypes" command to get examples of food types.
- Immediate Recommendations: You can use the "/hangry" command to get immediate food recommendations. The bot will provide recommendations based on default preferences (maximum distance, open now, etc.).

### Environment variables in `.env` file

| Variable  | Description        |
| --------- | ------------------ |
| TELE_KEY  | Telegram bot token |
| GMAP_KEY  | google api key     |
| MONGO_URI | mongodb uri        |

see examples in .env.sample file

### Troubleshooting

If you encounter any issues or have questions regarding the Fud2Eat bot, you can reach out to me on telegram [@zhanrongg](https://t.me/zhanrongg)

### Conclusion

Fud2Eat is a convenient Telegram bot that helps you find nearby food options based on your preferences. By providing your location and preferences, you can discover new places to eat and satisfy your cravings. Enjoy exploring different cuisines with Fud2Eat!

### Improvements

- ~~query based on closest to location~~
- ~~provide distance from current position to foodplace~~
- ~~provide input of distance based on walking / driving time~~
- NLP analysis of reviews (sentiment, BOW analysis)
- ~~Favourites feature~~
- ~~Database implementation~~
- ~~Reroll for random~~
- ~~additional transport methods ( bus , mrt)~~

### Resources

Workflow diagram : https://app.diagrams.net/#G1JORFQgQ_k407Xnyp4EcEV64yuA9EMnpA

### Versioning

Version alpha 1.0.0:

- initial release

Version alpha 1.1.0:

- added database
- added favourites feature
- added reroll for random
- added input for distance based on time
