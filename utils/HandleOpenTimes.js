// payload = {
//   weekday_text: [
//     "Monday: Closed",
//     "Tuesday: 11:00 AM – 2:30 PM, 4:30 – 7:00 PM",
//     "Wednesday: 11:00 AM – 2:30 PM, 4:30 – 7:00 PM",
//     "Thursday: 11:00 AM – 2:30 PM, 4:30 – 7:00 PM",
//     "Friday: 11:00 AM – 2:30 PM, 4:30 – 7:00 PM",
//     "Saturday: 11:00 AM – 2:30 PM, 4:30 – 7:00 PM",
//     "Sunday: 11:00 AM – 2:30 PM, 4:30 – 7:00 PM",
//   ],
// };

// write a function that returns a string of the opening hours for today in a nice format
// e.g. "Tuesday:\n11:00 AM - 2.30 PM\n4:30 - 7:00 PM\n\n" , "Wednesday: 11:00 AM – 2:30 PM, 4:30 – 7:00 PM"

const HandleOpenTimes = (payload) => {
  let ret_str = "";
  for (let i = 0; i < payload.length; i++) {
    const [day, times] = payload[i].split(": ");
    ret_str += `${day}:\n`;

    // for each time, split by comma
    const times_arr = times.split(", ");
    for (let j = 0; j < times_arr.length; j++) {
      if (j === times_arr.length - 1) {
        ret_str += `${times_arr[j]}\n`;
        continue;
      }
      ret_str += `${times_arr[j]},\n`;
    }
    ret_str += "\n";
  }

  return ret_str;
};

module.exports = { HandleOpenTimes };
