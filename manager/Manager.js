const {
  getUserState,
  getUserPref,
  setUserState,
  setUserPref,
} = require("../utils/userUtils");

stateMap = {};
prefMap = {};

function getState(username) {
  if (stateMap[username] == undefined) {
    stateMap[username] = {};
  }

  return stateMap[username]["state"];
}

function getPref(username, pref) {
  if (prefMap[username] == undefined) {
    prefMap[username] = {};
  }
  // You can store the state in a database or in memory (e.g., using a Map or object)
  // Here, we'll use a simple object for demonstration purposes
  // try {
  //   const userpref = await getUserPref(username, pref);
  if (pref == "all") {
    return prefMap[username]["pref"];
  }

  return prefMap[username]["pref"][pref];
}

function setState(chatid, username, user_state) {
  if (stateMap[username] == undefined) {
    stateMap[username] = {};
  }

  stateMap[username]["state"] = user_state;

  if (stateMap[username]["chatid"] == undefined) {
    stateMap[username]["chatid"] = chatid;
  }
}

function setPref(chatid, username, pref, user_pref = null) {
  if (prefMap[username] == undefined) {
    prefMap[username] = {};
  }
  if (prefMap[username]["pref"] == undefined) {
    prefMap[username]["pref"] = {};
  }
  if (pref === "reset") {
    prefMap[username]["pref"] = {};
    return;
  }

  prefMap[username]["pref"][pref] = user_pref;

  if (prefMap[username]["chatid"] == undefined) {
    prefMap[username]["chatid"] = chatid;
  }
}

// periodically save to database
setInterval(async () => {
  console.log(stateMap);
  console.log(prefMap);
  if (Object.keys(stateMap).length == 0 && Object.keys(prefMap).length == 0) {
    return;
  }
  for ([username, user] of Object.entries(prefMap)) {
    const pref_obj = user.pref;
    const chatid = user.chatid;
    if (pref_obj == undefined) {
      continue;
    }
    for ([pref, value] of Object.entries(pref_obj)) {
      await setUserPref(chatid, username, pref, value);
    }
  }

  for ([username, user] of Object.entries(stateMap)) {
    const state = user.state;
    const chatid = user.chatid;
    await setUserState(chatid, username, state);
  }
}, 1000000);

module.exports = { getState, getPref, setState, setPref };
