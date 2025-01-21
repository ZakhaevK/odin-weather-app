export { getGif };

const img = document.querySelector("img");
const vcAPIKey = "3P8UXB5Q9KNGWUVT3F6XAYE9D"
const giphyAPIKey = "jIO30gVQ39v9A5u6L9moexe2hnpNyQpo";

async function getWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${vcAPIKey}`,
    { mode: "cors" },
  );
  const weatherData = await response.json();
}

async function getGif(searchterm) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPIKey}&s=${searchterm}&weirdness=2`,
    { mode: "cors" },
  );
  const gifData = await response.json();

  if (!gifData.data.images) {
    img.src =
      "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png";
    console.log("No image found");
  } else {
    img.src = gifData.data.images.original.url;
  }
}
