import {getGif} from "./apiHandler.js";
export {initialiseApp};

const searchBar = document.getElementById("search-addr");
const searchButt = document.getElementById("search-butt");
const weatherGif = document.getElementById("weather-gif");


async function initialiseApp() {
  searchButt.addEventListener("click", async (e) => {
    e.preventDefault();
    const gif = await getGif(searchBar.value);
    weatherGif.src = gif;
  })
}
