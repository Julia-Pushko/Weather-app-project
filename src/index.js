//task 1
let now = new Date();

let h5 = document.querySelector("h5");
let currentDate = now.getDate();
if (currentDate < 10) {
  currentDate = `0${currentDate}`;
}
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
h5.innerHTML = `${day}, ${hours}:${minutes}, ${month} ${currentDate}/${year}`;
//task 2

// function formSubmit(event) {
// event.preventDefault();

// let h1 = document.querySelector("h1");
// let input = document.querySelector("#search-button");

// h1.innerHTML = input.value;
// }

// let searchingForm = document.querySelector("#search-form");
// searchingForm.addEventListener("submit", formSubmit);
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
                <div class="card">
                  <div class="card-body">
                    <ul>
                      <li class="day">${day}</li>
                      <li class="img"><img src="img/sun1.svg" alt="" /></li>
                      <li class="day-temperature"><strong> 28°</strong>⁄25°</li>
                    </ul>
                  </div>
                </div>
              </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//Search engine

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperatureNow").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#max-temperature").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temperature").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let iconElement = document.querySelector("#current-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response);
}

function search(city) {
  let apiKey = "30d625d03dd23e91996028ac924ded11";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-button").value;
  search(city);
}
let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", handleSubmit);

//task From Celsius to Fahrenheit and back

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureNow");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);

  celsiuslink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureNow");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  celsiuslink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

//Adding button "Current" and using geolocation.
function showPosition(position) {
  let apiKey = "30d625d03dd23e91996028ac924ded11";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Kyiv");
displayForecast();
