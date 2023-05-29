const { User } = require("../models/user.js");
const { MoreDetails } = require("../services/MoreDetails.js");

const checkUserExist = async (username) => {
  let user_query;
  try {
    user_query = await User.findOne({ username: username });
  } catch (error) {
    console.log(error);
  }
  if (user_query) {
    return user_query;
  }

  return false;
};

const addUserOnStart = async (chatid, username) => {
  // find if user exists on db and add if not
  let user_query;
  try {
    user_query = await checkUserExist(username);

    if (!user_query) {
      const newUser = new User({
        chatid: chatid,
        username: username,
      });

      await newUser.save();
      console.log(`@${username} added to db`);
      return newUser;
    }

    if (user_query.usecount == undefined) {
      user_query.usecount = 0;
    }

    user_query.usecount += 1;
    await user_query.save();
    console.log(`@${username} usecount updated to ${user_query.usecount}`);
    return user_query;
  } catch (error) {
    console.log(error);
  }
};

const setUserPref = async (chatid, username, pref_type, user_pref) => {
  // find if user exists on db if yes modify user_pref else add user to db with pref
  let user_query;

  try {
    user_query = await checkUserExist(username);

    if (user_query) {
      if (!user_query.pref) {
        // If pref property is undefined, initialize it as an empty object
        user_query.pref = {};
      }

      if (user_query.pref.get(pref_type) != user_pref) {
        tmp = user_query.pref.get(pref_type);
        user_query.pref.set(pref_type, user_pref);

        await user_query.save();

        console.log(
          `@${username}'s pref updated from ${tmp} to ${user_pref} in db`
        );

        return user_query;
      }
    } else {
      const newUser = new User({
        chatid: chatid,
        username: username,
        pref: { [pref_type]: user_pref },
      });

      await newUser.save();

      console.log(`@${username} added to db`);

      return newUser;
    }
  } catch (error) {
    console.log(error);
  }
};

// test setUserPref

const setUserState = async (chatid, username, user_state) => {
  // find if user exists on db if yes modify user_pref else add user to db with pref
  let user_query;

  try {
    user_query = await checkUserExist(username);

    tmp = user_query.state;

    if (user_query) {
      if (!user_query.state) {
        // If pref property is undefined, initialize it as an empty object
        user_query.state = "";
      }

      if (user_query.state !== user_state) {
        user_query.state = user_state;
        await user_query.save();

        console.log(
          `@${username}'s state:${tmp} updated to state:${user_state} in db`
        );

        return user_query;
      }
    } else {
      const newUser = new User({
        chatid: chatid,
        username: username,
        state: user_state,
      });

      await newUser.save();

      console.log(`@${username} added to db`);

      return newUser;
    }
  } catch (error) {
    console.log(error);
  }
};

// test setUserState

const getUserPref = async (username, pref) => {
  // check if username exist in db
  let user_query;

  try {
    user_query = await checkUserExist(username);

    if (user_query) {
      if (!user_query.pref) {
        // If pref property is undefined, initialize it as an empty object
        user_query.pref = {};
        return false;
      }

      // if pref == "all" retrun all pref
      if (pref == "all") {
        console.log(`@${username}'s pref is ${user_query.pref}`);
        return user_query.pref;
      }

      if (user_query.pref[pref]) {
        console.log(`@${username}'s ${pref} pref is ${user_query.pref[pref]}`);
        return user_query.pref[pref];
      }
    } else {
      console.log(`@${username} not found in db`);
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

// test getUserPref
// async function test() {
//   const userpref = await getUserPref("zhanrongg", "cuisine");

//   console.log(userpref);
// }

// test();

const getUserState = async (username) => {
  // check if username exist in db
  let user_query;

  try {
    user_query = await checkUserExist(username);

    if (user_query) {
      if (user_query.state) {
        console.log(`@${username}'s state is ${user_query.state}`);
        return user_query.state;
      }
    } else {
      console.log(`@${username} not found in db`);
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const addToFavourites = async (username, placeId) => {
  console.log(username, placeId);
  try {
    // check if user exist in database
    user_query = await checkUserExist(username);
    console.log(user_query, "user_query");

    if (user_query) {
      // check if place is in favourites
      console.log(user_query.favourite, "favourites");
      if (!user_query.favourite) {
        user_query.favourite = [];
      }

      // if (user_query.favourite.includes(placeId)) {
      //   console.log(`@${username}'s favourites already has ${placeId}`);
      //   return { status: false, message: "❌ Already in favourites" };
      // }

      for (let i = 0; i < user_query.favourite.length; i++) {
        if (user_query.favourite[i].placeId === placeId) {
          console.log(`@${username}'s favourites already has ${placeId}`);
          return { status: false, message: "❌ Already in favourites" };
        }
      }

      // call google api to get place details
      const res = await MoreDetails(placeId);

      if (!res) {
        console.log("res call error");
        return {
          status: false,
          message: "❌ Error adding to favourites. Please try again later",
        };
      }

      if (res.status !== 200) {
        console.log("res status error", res.status);
        return {
          status: res.status,
          message: "❌ Error adding to favourites. Please try again later",
        };
      }

      const place = res.data;

      // save object into favourites
      const placeObj = {
        placeId: place.place_id,
        data: place,
      };

      user_query.favourite.push(placeObj);
      await user_query.save();

      return { status: true, message: "✅ Added to favourites" };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "❌ Error adding to favourites. Please try again later",
    };
  }
};

const getFavourites = async (username) => {
  try {
    // check if user exist in database
    user_query = await checkUserExist(username);

    // check if favourites exist
    if (!user_query.favourite) {
      user_query.favourite = [];
    }

    // check if favourites is empty
    if (user_query.favourite.length == 0) {
      return { status: false, message: "❌ No favourites found" };
    }

    return {
      status: true,
      message: "✅ favourites found",
      data: user_query.favourite,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "❌ Error getting favourites. Please try again later",
    };
  }
};

const getFavouritesById = async (username, placeId) => {
  const favourite_response = await getFavourites(username);
  const favourite_arr = favourite_response.data;

  if (favourite_arr.length == 0) {
    return { status: false, message: "❌ No favourites found" };
  }

  for (let i = 0; i < favourite_arr.length; i++) {
    if (favourite_arr[i].placeId === placeId) {
      console.log("returned");
      return {
        status: true,
        message: "✅ favourites found",
        data: favourite_arr[i],
      };
    }
  }
};

module.exports = {
  addUserOnStart,
  setUserPref,
  setUserState,
  getUserState,
  getUserPref,
  addToFavourites,
  getFavourites,
  getFavouritesById,
};
