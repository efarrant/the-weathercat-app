function formatDate(timestamp) {
  let date = new Date(timestamp);
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = daysOfWeek[date.getDay()];
  let dateNumber = date.getDate();
  let month = monthsOfYear[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day}, ${dateNumber} ${month} ${hours} : ${minutes}`;
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
    let windSpeed = Math.round(response.data.wind.speed);
    let humidity = response.data.main.humidity;
    let temperatureElement = document.querySelector(".temperature");
    let weatherDescriptionElement =
      document.querySelector(".weather-condition");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    let windElement = document.querySelector("#windspeed");
    let humidityElement = document.querySelector("#humidity");
    temperatureElement.innerHTML = temperatureNumber;
    weatherDescriptionElement.innerHTML = weatherDescription;
    windElement.innerHTML = windSpeed;
    humidityElement.innerHTML = humidity;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    if (hours > 7 && hours < 21) {
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
  fahrenheitButton.disabled = true; 
  let celsiusButton = document.querySelector(".celsius");
  celsiusButton.disabled = false;
}

function celsiusConverter() {
  let tempElement = document.querySelector(".temperature");
  let temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  let celsiusButton = document.querySelector(".celsius");
  celsiusButton.style.color = "yellow";
  celsiusButton.disabled = true;
  let fahrenheitButton = document.querySelector(".fahrenheit");
  fahrenheitButton.disabled = false; 
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
celsius.disabled = true;
celsius.addEventListener("click", celsiusConverter);

if (hours < 7 || hours > 21) {
  document.getElementById("backgroundImage").style.backgroundImage =
    "url(src/gifs/window-cat-night.gif)";
}

document.addEventListener("DOMContentLoaded", getCurrentPosition());

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
  let windElement = document.querySelector("#windspeed");
  let windSpeed = Math.round(location.data.wind.speed);
  windElement.innerHTML = windSpeed;
  let humidityElement = document.querySelector("#humidity");
  let humidity = location.data.main.humidity;
humidityElement.innerHTML = humidity;
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon")
  dateElement.innerHTML = formatDate(location.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${location.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt",response.data.weather[0].description);
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
