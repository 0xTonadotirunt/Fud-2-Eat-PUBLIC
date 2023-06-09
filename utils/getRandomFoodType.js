const singaporeFoodTypes = [
  "Chicken Rice",
  "Chili Crab",
  "Laksa",
  "Hainanese Noodles",
  "Satay",
  "Roti Prata",
  "Char Kway Teow",
  "Bak Kut Teh",
  "Nasi Lemak",
  "Mee Goreng",
  "Fish Head Curry",
  "Bak Chor Mee",
  "Rojak",
  "Popiah",
  "Curry Puffs",
  "Kaya Toast",
  "Bak Chang (Rice Dumplings)",
  "Oyster Omelette",
  "Tau Huay (Soybean Curd)",
  "Durian",
  "Ice Kachang",
  "Kaya (Coconut Jam)",
  "Rendang",
  "Otak-Otak",
  "Fried Carrot Cake",
  "Wanton Mee",
  "Prawn Noodles",
  "Murtabak",
  "Kueh",
  "Nasi Padang",
  "Biryani",
  "Sambal Stingray",
  "Curry Laksa",
  "Chwee Kueh",
  "Bak Kwa (Barbecued Meat)",
  "Satay Bee Hoon",
  "Sambal Kangkong",
  "Chendol",
  "Mee Siam",
  "Hokkien Mee",
  "Fried Hokkien Prawn Mee",
  "Tau Suan",
  "Char Siew Rice",
  "Kway Chap",
  "Fishball Noodles",
  "Claypot Rice",
  "Mooncake",
  "Hokkien Ngoh Hiang",
  "Pandan Cake",
  "Orh Luak (Oyster Omelette)",
  "Kueh Pie Tee",
];

const getRandomFoodType = () => {
  //
  const randomIndex = Math.floor(Math.random() * singaporeFoodTypes.length);
  return singaporeFoodTypes[randomIndex];
};

module.exports = { getRandomFoodType };
