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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  let temperatureNumber = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let temperatureElement = document.querySelector(".temperature");
  let weatherDescriptionElement = document.querySelector(".weather-condition");
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
  getForecast(response.data.coord);
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
    } else if (weatherDescriptionElement.innerHTML.includes("clear")) {
      document.getElementById("backgroundImage").style.backgroundImage =
        "url(src/gifs/window-cat-sunny.gif)";
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
  celsiusButton.style.color = "white";
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
  fahrenheitButton.style.color="white";
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
  getForecast(location.data.coord);
  let cityAndCountry = document.querySelector(".city-and-country");
  cityAndCountry.innerHTML = `${location.data.name}, ${location.data.sys.country}`;
  showTemperature(location);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  // console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row g-1 justify-content-center weekdays"><div class = "col"></div>`;
  
  forecast.forEach(function (forecastDay, index) {

    if (index < 7) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col">
              <div class="card text-info" style="background-image: url('src/images/test.jpg')">
                <div class="card-body p-0 weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img
                  class="card-img-top"
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt="Card image cap"
                /> <div class="card-body p-0 weather-forecast-temperature"><span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}
                </span>°/<span class= "weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}</span>°</div>
              </div>
            </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `<div class = "col"></div></div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4d25fa39d39f9d90630ef9306854c84f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let geolocationButton = document.querySelector(".compass");
geolocationButton.addEventListener("click", getCurrentPosition);
