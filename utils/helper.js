const handlepriceLevel = (priceLevel) => {
  // price level is an integer from 0 to 4 where 0 is free and 4 is expensive, return number of dollar signs based on price level
  const dollarSign = "$";
  const price = dollarSign.repeat(priceLevel + 1);

  return `Affordability: ${price}\n`;
};

const generateStars = (rating) => {
  const stars = "⭐️";

  const emptyStars = "🔲";
  const totalStars = 5;
  const fullStars = stars.repeat(Math.floor(rating));
  return `${rating} ${fullStars}`;
};

const generateOpenNow = (open_now) => {
  if (open_now) {
    return "✅";
  } else {
    return "❌";
  }
};

// helper function to generate a map based on geometry
const generateMap = (geometry) => {
  const lat = geometry.location.lat;
  const lng = geometry.location.lng;
  const map = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return map;
};

module.exports = {
  generateStars,
  handlepriceLevel,
  generateOpenNow,
  generateMap,
};
