import { getGif, getWeatherData } from "./apiHandler.js";
export { initialiseApp };

const searchBar = document.getElementById("search-addr");
const searchButt = document.getElementById("search-butt");
const checkCelsius = document.getElementById("search-cels");
const resultDiv = document.getElementById("result-div");

async function initialiseApp() {
  searchButt.addEventListener("click", async (e) => {
    // Disable button from taking further input during retrieval
    searchButt.toggleAttribute("disabled");
    resultDiv.replaceChildren("");
    e.preventDefault();

    // Loading div for user
    const loadDiv = document.createElement("div");
    loadDiv.id = "result-loading";
    loadDiv.textContent = "Loading...";
    resultDiv.appendChild(loadDiv);

    // Call of API's and error catching
    try {
      const weatherResult = await getWeatherData(searchBar.value);
      const searchStr = getWeatherSearch(weatherResult);
      const gif = await getGif(searchStr);

      Promise.all(searchStr, gif).then(() => {
        const weatherGif = document.createElement("img");
        weatherGif.src = gif;
        displayWeather(weatherResult, checkCelsius.checked);
        resultDiv.appendChild(weatherGif);
        loadDiv.classList.toggle("hide");
        searchButt.toggleAttribute("disabled");
      });
    } catch (err) {
      console.log(err);
      loadDiv.textContent = "Error retrieving data.";
      searchButt.toggleAttribute("disabled");
    }
  });
}

// Handles weather data display in DOM
function displayWeather(weatherData, celsius) {
  const locationPara = document.createElement("p");
  locationPara.textContent = weatherData.address;

  const weatherDetails = document.createElement("div");
  weatherDetails.id = "weather-details";

  const dateTime = document.createElement("p");
  dateTime.textContent = "Local Time:";
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

// Finds a string based on weather details, is used for gif search
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
  } else if (cond.includes("Overcast")) {
    weatherStr += "cloudy weather";
  } else {
    weatherStr += "clear sky";
  }
  console.log(`Weather String is: ` + weatherStr);
  return weatherStr;
}
