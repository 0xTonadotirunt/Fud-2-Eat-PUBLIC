//helper function for if open == true return (open) else return (open/close)
const openOrClose = (open) => {
  if (open) {
    return "open";
  } else {
    return "open or closed";
  }
};

// helper function for bot to send confirmation message

const ConfirmationMessage = (userprefs) => {
  const message = `Please confirm the following details ! 
  ${
    userprefs["type"]
      ? `\n\nI am craving for *${
          userprefs["type"].charAt(0).toUpperCase() + userprefs["type"].slice(1)
        }*.`
      : ""
  } 
  \nI am willing to travel *${userprefs["radius"]}* ${
    userprefs["distancetype"] === "time" ? "min" : "m"
  }. 
  \nI am looking for a maximum of *${userprefs["numplaces"]}* *${openOrClose(
    userprefs["openboolean"]
  )}* food places and i am *${userprefs["mode"]}* there!\n\nConfirm ?`;
  return message;
};

module.exports = { ConfirmationMessage };
