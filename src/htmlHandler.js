import { getGif, getWeatherData } from "./apiHandler.js";
export { initialiseApp };

const searchBar = document.getElementById("search-addr");
const searchButt = document.getElementById("search-butt");
const weatherGif = document.getElementById("weather-gif");
const weatherDesc = document.getElementById("weather-desc");
const checkCelsius = document.getElementById("search-cels")

async function initialiseApp() {
  searchButt.addEventListener("click", async (e) => {
    e.preventDefault();
    const weatherResult = await getWeatherData(searchBar.value);
    if (checkCelsius.checked) {
      weatherResult[2] = fahrenheitToCelsius(weatherResult[2]);
    }
    const searchStr = await getWeatherSearch(weatherResult)
    const gif = await getGif(searchStr);
    await console.log(weatherResult);
    weatherGif.src = gif;
    displayWeather(weatherResult, checkCelsius.checked);
  });
}

function displayWeather(weatherData, celsius) {
  let tempText = "°C";
  if (!celsius) {
    tempText = "°F"
  }
  weatherDesc.textContent = `It is currently ${weatherData[2]}${tempText} at ${weatherData[0]}. The local time is ${weatherData[1]} and weather is considered ${weatherData[3]}.`;
}

function getWeatherSearch(weatherData) {
  let weatherStr = "";
  const temp = weatherData[2];
  const cond = weatherData[3];
  console.log(`Weather temp is: ` + temp);
  console.log(`Weather cond is: ` + cond);

  if (cond.includes("rain")) {
    weatherStr += "rain";
  } else if (temp < 60.8) {
    weatherStr += "cool weather";
  } else if (temp > 82.4) {
    weatherStr += "hot weather";
  } else if (cond.includes("overcast")) {
    weatherStr +=  "cloudy weather";
  } else {
    weatherStr += "clear sky";
  }
  console.log(`Weather String is: ` + weatherStr);
  return weatherStr;
}

function fahrenheitToCelsius(deg) {
  return (((deg - 32) * 5/9)).toFixed(2);
}