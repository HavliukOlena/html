let displayedTime = document.querySelector("#current-time-display");

let now = new Date();

let weeksDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weeksDays[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
displayedTime.innerHTML = `${day},  ${currentHour}:${currentMinute} `;

function showTheSity(event) {
  event.preventDefault();
  let submitedSity = document.querySelector("#city-style");
  let newEnteredSity = document.querySelector("#entered-sity");
  let city = submitedSity.value;
  newEnteredSity.innerHTML = `${city}`;

  function showTemperature(response) {
    let realTemperature = Math.round(response.data.main.temp);
    let displayedRealTemperature = document.querySelector("#temptemp");
    displayedRealTemperature.innerHTML = `${realTemperature} °C`;

    let realTempFeelsLike = Math.round(response.data.main.feels_like);
    let displayedRealTempFeelsLike = document.querySelector("#feels_like");
    displayedRealTempFeelsLike.innerHTML = `Feels like ${realTempFeelsLike} °C`;

    let realDescription = response.data.weather[0].description;
    let displayedRealDescription = document.querySelector("h3");
    displayedRealDescription.innerHTML = realDescription;

    let realPrecipitation = response.data.main.pressure;
    let displayedPrecipitation = document.querySelector("#precipitation");
    displayedPrecipitation.innerHTML = `Precipitation: ${Math.round(
      realPrecipitation / 100
    )} %`;

    let realHumidity = response.data.main.humidity;
    let displayedHumidity = document.querySelector("#humidity");
    displayedHumidity.innerHTML = `Humidity: ${realHumidity} %`;

    let realWind = response.data.wind.speed;
    let displayedWind = document.querySelector("#wind");
    displayedWind.innerHTML = `Wind: ${Math.round(realWind)} km/h`;
  }

  let apiKey = "13503136859e9dffd277dab65a0e3801";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=13503136859e9dffd277dab65a0e3801&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showTheSity);

function showLocalTemperature(response) {
  console.log(response);
  let localCity = response.data.name;
  let displayedLocalCity = document.querySelector("#entered-sity");
  displayedLocalCity.innerHTML = localCity;

  let localTemperature = Math.round(response.data.main.temp);
  let displayedLocalTemperature = document.querySelector("#temptemp");
  displayedLocalTemperature.innerHTML = `${localTemperature} °C`;

  let localTempFeelsLike = Math.round(response.data.main.feels_like);
  let displayedLocalTempFeelsLike = document.querySelector("#feels_like");
  displayedLocalTempFeelsLike.innerHTML = `Feels like ${localTempFeelsLike} °C`;

  let localDescription = response.data.weather[0].description;
  let displayedLocalDescription = document.querySelector("h3");
  displayedLocalDescription.innerHTML = localDescription;

  let localPrecipitation = response.data.main.pressure;
  let displayedLocalPrecipitation = document.querySelector("#precipitation");
  displayedLocalPrecipitation.innerHTML = `Precipitation: ${Math.round(
    localPrecipitation / 100
  )} %`;

  let localHumidity = response.data.main.humidity;
  let displayedLocalHumidity = document.querySelector("#humidity");
  displayedLocalHumidity.innerHTML = `Humidity: ${localHumidity} %`;

  let localWind = response.data.wind.speed;
  let displayedLocalWind = document.querySelector("#wind");
  displayedLocalWind.innerHTML = `Wind: ${Math.round(localWind)} km/h`;
}

function getPosition(position) {
  let localLatitude = position.coords.latitude;
  let localLongitude = position.coords.longitude;
  let apiKey = "13503136859e9dffd277dab65a0e3801";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${localLatitude}&lon=${localLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let buttonCoord = document.querySelector("#coord");
buttonCoord.addEventListener("click", getCurrentPosition);
