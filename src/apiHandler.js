export { getWeatherData, getGif };

const vcAPIKey = "3P8UXB5Q9KNGWUVT3F6XAYE9D";
const giphyAPIKey = "jIO30gVQ39v9A5u6L9moexe2hnpNyQpo";

async function getWeatherData(location) {
  // May move replaceAll's to the relevant event listener.
  location = location.replaceAll(" ", "%20");
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${vcAPIKey}`,
    { mode: "cors" },
  );
  const weatherData = await response.json();
  const returnData = [
    weatherData.resolvedAddress,
    weatherData.currentConditions.datetime,
    weatherData.currentConditions.temp,
    (weatherData.currentConditions.conditions).toLowerCase(),
  ];
  return await returnData;
}

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
