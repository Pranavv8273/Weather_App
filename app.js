const apiKey = "face21254a6c4fb0ad784626250404"; // your WeatherAPI key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    if (!response.ok) {
      throw new Error('City not found. Please check spelling!');
    }
    const data = await response.json();
    showWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function showWeather(data) {
  const { location, current } = data;

  weatherInfo.innerHTML = `
    <h2>${location.name}, ${location.region}, ${location.country}</h2>
    <p><strong>Local Time:</strong> ${location.localtime}</p>
    <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
    <p><strong>Condition:</strong> ${current.condition.text}</p>
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
  `;
}
