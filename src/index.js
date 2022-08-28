//Show day & time
function showDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  date.innerHTML = `${day}, ${hour}:${minutes}`;
}

let now = new Date();

let date = document.querySelector("#current-date");
showDate(date);

//show current temperature
//show current temp
function showCurrentTemp(data) {
  let temperatureCity = document.querySelector("#currentTemp");
  temperatureCity.innerHTML = data;
}

function showTemperature(response) {
  let temperatureCurrent = Math.round(response.data.main.temp);
  showCurrentTemp(temperatureCurrent);
}
function requestDataTempr() {
  let apiKey = "00ceb4c1a676b6d772176beae74069d4";
  let cityName = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//show the city
function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-search").value;
  let city = document.querySelector("h1");
  if (inputCity) {
    city.innerHTML = inputCity;
  }
  requestDataTempr();
}
let searchSubmit = document.querySelector("form");
searchSubmit.addEventListener("click", searchCity);

// change temp unit
function changeinF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTemp");
  let temperature = (Number(currentTemp.textContent) * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(temperature);
}
function changeinC(event) {
  event.preventDefault();

  let currentTemp = document.querySelector("#currentTemp");
  let temperature = Number(currentTemp.textContent);
  currentTemp.innerHTML = Math.round((temperature - 32) / 1.8);
}

let unitC = document.querySelector("#celcium");
unitC.addEventListener("click", changeinC);

let unitF = document.querySelector("#farenheit");
unitF.addEventListener("click", changeinF);

//weather by navigation
function showLocalTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  showCurrentTemp(currentTemp);
  let city = document.querySelector("h1");
  city.innerHTML = "Your location";
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let keyApi = "00ceb4c1a676b6d772176beae74069d4";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric`;
  console.log(urlApi);
  axios.get(urlApi).then(showLocalTemperature);
}

function displayLocalWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentWether = document.querySelector("#current-btn");
currentWether.addEventListener("click", displayLocalWeather);
