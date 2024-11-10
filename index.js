const API_KEY = "DRXTJ67JE9ECAJBPCXFTDTLS2";
let API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sydney?key=${API_KEY} `;
const IMAGES_API_KEY = "L4UWXpCRYd57ma2fhgsmYLZgzZf32HCvZqLXeNeqc4w";

const search_button = document.querySelector(".search");
const location_input = document.querySelector("#location");
const weatherContainer = document.querySelector(".weather-container");
const conditions = document.querySelector(".conditions");
const feelsLike = document.querySelector(".feels-like");
const temprature = document.querySelector(".temprature");
const windSpeed = document.querySelector(".wind-speed");
const locationData = document.querySelector(".location-data");
const cesiusSwitch = document.querySelector(".celsius-switch");



async function fetchWeatherData(url) {
  // defalut location set to sydney
  try {
    return await fetch(url, { mode: "cors" });
  } catch (error) {
    console.log("the error is: ", error);
  }
}

async function fetchLocationWeather(location) {
  if (location) {
    try {
      API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY} `;
      let data = await fetchWeatherData(API_URL);
      const dataInJson = await data.json();
      return dataInJson;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("location is not valid");
  }
}

function dataExtraction(json_data) {
  return {
    current_temperature: json_data.currentConditions.temp,
    current_condition: json_data.currentConditions.conditions,
    current_feels_like: json_data.currentConditions.feelslike,
    current_wind_speed: json_data.currentConditions.windspeed,
    current_location: json_data.resolvedAddress,
  };
}

search_button.addEventListener("click", async (e) => {
  e.preventDefault();
  let fetchedData = await fetchLocationWeather(location_input.value);
  let data = dataExtraction(fetchedData);

  conditions.textContent = data.current_condition;
  feelsLike.textContent = `${data.current_feels_like}ºF`;
  temprature.textContent = `${data.current_temperature}ºF`;
  windSpeed.textContent = data.current_wind_speed;
  locationData.textContent = data.current_location;

  console.log(dataExtraction(fetchedData));
  console.log(fetchedData);
  cesiusSwitch.addEventListener("change", () => {
    if (cesiusSwitch.checked) {
      temprature.textContent = `${convertToCelsius(
        data.current_temperature
      )}ºC`;
      feelsLike.textContent = `${convertToCelsius(data.current_feels_like)}ºC`;
    } else {
      feelsLike.textContent = `${data.current_feels_like}ºF`;
      temprature.textContent = `${data.current_temperature}ºF`;
    }
  });
});

function convertToCelsius(farhrenheit) {
  return Number(((farhrenheit - 32) * 5) / 9).toFixed(1);
}
