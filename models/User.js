const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatid: Number,
  username: String,
  state: String,
  pref: {
    type: Map,
    of: String,
  },
  favourite: Array,
  usecount: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
