// frontend/app.js
const form = document.getElementById("form");
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (!city) {
    weatherDiv.innerHTML = '<p style="color:red;">Please enter a city name.</p>';
    return;
  }

  weatherDiv.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await fetch(
      `http://localhost:5000/weather?city=${encodeURIComponent(city)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to fetch weather data");
    }

    weatherDiv.innerHTML = `
      <div class="weather-info">
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="description">${data.weather[0].description}</div>
        <div class="location">${data.name}, ${data.sys.country}</div>
      </div>
    `;
  } catch (err) {
    weatherDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});
