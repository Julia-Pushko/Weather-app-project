//task 1
let now = new Date();

let h5 = document.querySelector("h5");
let currentDate = now.getDate();
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

//task 3

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureNow");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureNow");
  temperatureElement.innerHTML = 26;
}

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

//Search engine

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperatureNow").innerHTML = Math.round(
    response.data.main.temp
  );
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

search("Kyiv");

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
