export { getWeatherData, getGif };

const vcAPIKey = "3P8UXB5Q9KNGWUVT3F6XAYE9D";
const giphyAPIKey = "jIO30gVQ39v9A5u6L9moexe2hnpNyQpo";

// Fetch weather data from visualcrossing, then returns an object with useful data
async function getWeatherData(location) {
  location = location.replaceAll(" ", "%20");
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${vcAPIKey}`,
    { mode: "cors" },
  );
  const weatherData = await response.json();
  console.log(weatherData);
  const returnData = {
    address: weatherData.resolvedAddress,
    datetime: weatherData.currentConditions.datetime,
    tempF: weatherData.currentConditions.temp,
    tempC: toCelsius(weatherData.currentConditions.temp),
    feelslikeF: weatherData.currentConditions.feelslike,
    feelslikeC: toCelsius(weatherData.currentConditions.feelslike),
    conditions: weatherData.currentConditions.conditions,
    humidity: weatherData.currentConditions.humidity,
    sunrise: weatherData.currentConditions.sunrise,
    sunset: weatherData.currentConditions.sunset,
  };

  return await returnData;
}

// Fetch a gif from giphy based on a string, and return the url for display
async function getGif(searchTerm) {
  searchTerm = searchTerm.replaceAll(" ", "%20");
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPIKey}&s=${searchTerm}&weirdness=2`,
    { mode: "cors" },
  );
  const gifData = await response.json();
  console.log(gifData);

  if (!gifData.data.images) {
    console.log("No image found");
    return "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png";
  } else {
    console.log(gifData.data.images.original.url);
    return gifData.data.images.original.url;
  }
}

// Used for weather object data
function toCelsius(deg) {
  return (((deg - 32) * 5) / 9).toFixed(2);
}
