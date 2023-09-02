import fetchData from "./weather_api";

export default function init() {
  const searchBtn = document.querySelector('.search-icon');
  const cityInput = document.querySelector('.city-input');
  const cityName = document.querySelector('.city-name');
  const toggle = document.querySelector('.toggle');
  searchBtn.addEventListener('click', () => {
    if (toggle.checked === true) handleQeury(cityInput.value, 'f');
    else handleQeury(cityInput.value, 'c');
    cityInput.blur();
  });
  cityInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      if (toggle.checked === true) handleQeury(cityInput.value, 'f');
      else handleQeury(cityInput.value, 'c');
      cityInput.blur();
    }
  });

  toggle.addEventListener('click', () => {
    if (toggle.checked === true) handleQeury(cityName.textContent, 'f');
    else handleQeury(cityName.textContent, 'c');
  });

  handleQeury('Paris', 'c');
}

async function handleQeury(city, metric) {
  const searchIcon = document.querySelector('.search-icon');
  searchIcon.src = 'img/loading.gif';
  searchIcon.style.width = '24px';
  searchIcon.style.height = '24px';
  const result = await fetchData(city);
  searchIcon.src = 'img/search.svg';
  if (result === false) {
    alert('Incorrect city name');
    return;
  }
  const cityName = document.querySelector('.city-name');
  const countryName = document.querySelector('.country-name');
  const todayDate = document.querySelector('.today-date');
  const temperature = document.querySelector('.temperature-text');
  const wind = document.querySelector('.wind-text');
  const humidity = document.querySelector('.humidity-text');
  const cloudText = document.querySelector('.cloud-text');
  const precipText = document.querySelector('.precip-text');
  const condition = document.querySelector('.weather-state');

  cityName.textContent = result.location.name;
  countryName.textContent = result.location.country;
  const timestamp = result.location.localtime_epoch;
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(0);
  date.setUTCSeconds(timestamp);
  todayDate.textContent = `${weekdays[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}`;
  if (metric === 'c') temperature.textContent = `${Math.round(result.current.temp_c)}${String.fromCharCode(176)}C`;
  if (metric === 'f')temperature.textContent = `${Math.round(result.current.temp_f)}${String.fromCharCode(176)}F`;
  wind.textContent = `${result.current.wind_kph} km/h`;
  humidity.textContent = result.current.humidity;
  cloudText.textContent = result.current.cloud;
  precipText.textContent = `${result.current.precip_mm} mm`;
  condition.textContent = result.current.condition.text;

  const forecastHeaders = document.querySelectorAll('.forecast-week-day');
  const forecastIcons = document.querySelectorAll('.forecast-icon');
  const forecastTemperature = document.querySelectorAll('.forecast-temperature');

  const forecastData = result.forecast.forecastday;
  forecastData.shift();

  for (let i = 0; i < 7; i++) {
    const dayData = forecastData[i];
    const weekDate = new Date(0);
    weekDate.setUTCSeconds(dayData.date_epoch);
    forecastHeaders[i].textContent = weekdays[weekDate.getDay()];
    forecastIcons[i].src = `https:${dayData.day.condition.icon}`;
    if (metric === 'c') forecastTemperature[i].textContent = `${dayData.day.avgtemp_c}${String.fromCharCode(176)}C`;
    if (metric === 'f') forecastTemperature[i].textContent = `${dayData.day.avgtemp_f}${String.fromCharCode(176)}F`;
  }
}
