import { getGif, getWeatherData } from "./apiHandler.js";
export { initialiseApp };

const searchBar = document.getElementById("search-addr");
const searchButt = document.getElementById("search-butt");
const checkCelsius = document.getElementById("search-cels");
// const weatherDetails = document.getElementById("weather-details");
const resultDiv = document.getElementById("result-div");

async function initialiseApp() {
  searchButt.addEventListener("click", async (e) => {
    resultDiv.replaceChildren("");
    e.preventDefault();
    const weatherResult = await getWeatherData(searchBar.value);
    const searchStr = await getWeatherSearch(weatherResult);
    const gif = await getGif(searchStr);

    await console.log(weatherResult);

    const weatherGif = document.createElement("img");
    weatherGif.src = gif;
    displayWeather(weatherResult, checkCelsius.checked);
    resultDiv.appendChild(weatherGif);
  });
}

function displayWeather(weatherData, celsius) {

  const locationPara = document.createElement("p");
  locationPara.textContent = weatherData.address;

  const weatherDetails = document.createElement("div");
  weatherDetails.id = "weather-details";

  const dateTime = document.createElement("p");
  dateTime.textContent = "Date/Time:";
  const dateTimeVal = document.createElement("p");
  dateTimeVal.textContent = weatherData.datetime;

  const curTemp = document.createElement("p");
  curTemp.textContent = "Current Temp:";
  const curTempVal = document.createElement("p");
  if (celsius) {
    curTempVal.textContent = `${weatherData.tempC}°C`;
  } else {
    curTempVal.textContent = `${weatherData.tempF}°F`;
  }

  const feelslike = document.createElement("p");
  feelslike.textContent = "Feels Like:";
  const feelslikeVal = document.createElement("p");
  if (celsius) {
    feelslikeVal.textContent = `${weatherData.feelslikeC}°C`;
  } else {
    feelslikeVal.textContent = `${weatherData.feelslikeF}°F`;
  }

  const conditions = document.createElement("p");
  conditions.textContent = "Conditions:";
  const conditionsVal = document.createElement("p");
  conditionsVal.textContent = weatherData.conditions;

  const humidity = document.createElement("p");
  humidity.textContent = "Humidity:";
  const humidityVal = document.createElement("p");
  humidityVal.textContent = `${weatherData.humidity}%`;

  const sunrise = document.createElement("p");
  sunrise.textContent = "Sunrise:";
  const sunriseVal = document.createElement("p");
  sunriseVal.textContent = weatherData.sunrise;

  const sunset = document.createElement("p");
  sunset.textContent = "Sunset:";
  const sunsetVal = document.createElement("p");
  sunsetVal.textContent = weatherData.sunset;

  weatherDetails.appendChild(dateTime);
  weatherDetails.appendChild(dateTimeVal);

  weatherDetails.appendChild(curTemp);
  weatherDetails.appendChild(curTempVal);

  weatherDetails.appendChild(feelslike);
  weatherDetails.appendChild(feelslikeVal);

  weatherDetails.appendChild(conditions);
  weatherDetails.appendChild(conditionsVal);

  weatherDetails.appendChild(humidity);
  weatherDetails.appendChild(humidityVal);

  weatherDetails.appendChild(sunrise);
  weatherDetails.appendChild(sunriseVal);

  weatherDetails.appendChild(sunset);
  weatherDetails.appendChild(sunsetVal);

  resultDiv.appendChild(locationPara);
  resultDiv.appendChild(weatherDetails);
  
}

function getWeatherSearch(weatherData) {
  let weatherStr = "";
  const temp = weatherData.tempF;
  const cond = weatherData.conditions;
  console.log(`Weather temp is: ` + temp);
  console.log(`Weather cond is: ` + cond);

  if (cond.includes("rain")) {
    weatherStr += "rain";
  } else if (temp < 60.8) {
    weatherStr += "cool weather";
  } else if (temp > 82.4) {
    weatherStr += "hot weather";
  } else if (cond.includes("overcast")) {
    weatherStr += "cloudy weather";
  } else {
    weatherStr += "clear sky";
  }
  console.log(`Weather String is: ` + weatherStr);
  return weatherStr;
}
