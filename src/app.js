function formatDate(date) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let formattedDate = `${day}, ${hours} : ${minutes}`;
  return formattedDate;
}

let apiKey = "4d25fa39d39f9d90630ef9306854c84f";

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let city = document.querySelector(".city-and-country");
  city.innerHTML = `${searchInput.value}`;
  // let apiKey = "4d25fa39d39f9d90630ef9306854c84f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);

  function showTemperature(response) {
    let temperatureNumber = Math.round(response.data.main.temp);
    let weatherDescription = response.data.weather[0].description;
    let temperatureElement = document.querySelector(".temperature");
    let weatherDescriptionElement =
      document.querySelector(".weather-condition");
    temperatureElement.innerHTML = temperatureNumber;
    weatherDescriptionElement.innerHTML = weatherDescription;
    if (hours > 7 && hours < 23) {
      if (weatherDescriptionElement.innerHTML.includes("ain")) {
        document.getElementById("backgroundImage").style.backgroundImage =
          "url(src/gifs/window-cat-rain.gif)";
      } else if (weatherDescriptionElement.innerHTML.includes("sun")) {
        document.getElementById("backgroundImage").style.backgroundImage =
          "url(src/gifs/window-cat-sunny.gif)";
      } else if (weatherDescriptionElement.innerHTML.includes("cloud")) {
        document.getElementById("backgroundImage").style.backgroundImage =
          "url(src/gifs/window-cat-clouds.gif)";
      } else if (weatherDescriptionElement.innerHTML.includes("storm")) {
        document.getElementById("backgroundImage").style.backgroundImage =
          "url(src/gifs/window-cat-thunderstorm.gif)";
      } else if (weatherDescriptionElement.innerHTML.includes("snow")) {
        document.getElementById("backgroundImage").style.backgroundImage =
          "url(src/gifs/window-cat-snow.gif)";
      } else if (weatherDescriptionElement.innerHTML.includes("wind")) {
        document.getElementById("backgroundImage").style.backgroundImage =
          "url(src/gifs/window-cat-windy.gif)";
      }
    }
  }
}

function fahrenheitConverter() {
  let tempElement = document.querySelector(".temperature");
  let temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  let fahrenheitButton = document.querySelector(".fahrenheit");
  fahrenheitButton.style.color = "yellow";
}

function celsiusConverter() {
  let tempElement = document.querySelector(".temperature");
  let temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  let celsiusButton = document.querySelector(".celsius");
  celsiusButton.style.color = "yellow";
}

let now = new Date();
let todaysDate = document.querySelector(".date-today");
todaysDate.innerHTML = `${formatDate(now)}`;
now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}


let search = document.querySelector("#magnifying-glass");
search.addEventListener("click", displayCity);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConverter);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", celsiusConverter);

if (hours < 7 || hours > 20) {
  document.getElementById("backgroundImage").style.backgroundImage = "url(src/gifs/window-cat-night.gif)";
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(logLongitudeAndLatitude);
}
function logLongitudeAndLatitude(coordinates) {
  let latitude = coordinates.coords.latitude;
  let longitude = coordinates.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocation);
}
function showLocation(location) {
  let cityAndCountry = document.querySelector(".city-and-country");
  cityAndCountry.innerHTML = `${location.data.name}, ${location.data.sys.country}`;
  let weatherCondition = document.querySelector(".weather-condition");
  weatherCondition.innerHTML = `${location.data.weather[0].description}`;
  if (hours < 7 || hours > 20) {
    document.getElementById("backgroundImage").style.backgroundImage =
      "url(src/gifs/window-cat-night.gif)";
  } else if (weatherCondition.innerHTML.includes("ain")) {
          document.getElementById("backgroundImage").style.backgroundImage =
            "url(src/gifs/window-cat-rain.gif)";
      } else if (weatherCondition.innerHTML.includes("cloud")) {
        document.getElementById("backgroundImage").style.backgroundImage =
          "url(src/gifs/window-cat-clouds.gif)";
      }
}

let geolocationButton = document.querySelector(".compass");
geolocationButton.addEventListener("click", getCurrentPosition);
