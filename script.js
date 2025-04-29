const apiKey = "b63dd475f2bf563a1ca83aeced582da3";

function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      //to update the weather information
      document.getElementById("city-name").textContent = data.name;
      document.getElementById("temperature").textContent = `${data.main.temp}°C`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("windspeed").textContent = `${data.wind.speed} km/h`;

      // to change icon based on weather type
      const weatherMain = data.weather[0].main;
      let icon = "☀️";
      if (weatherMain === "Rain") icon = "🌧️";
      else if (weatherMain === "Clouds") icon = "☁️";
      else if (weatherMain === "Snow") icon = "❄️";
      else if (weatherMain === "Thunderstorm") icon = "⛈️";
      document.getElementById("weather-icon").textContent = icon;
    })
    .catch(err => {
      // to show alert box if city is not found
      alert("City not found. Please enter a valid city name.");
      console.error("Error fetching weather data:", err);
    });
}

// Add event listener for the search button
document.getElementById('search-button').addEventListener('click', function () {
  const city = document.getElementById('search-city').value.trim();
  if (city) {
    getWeather(city);   // Call the function with city name
  } else {
    alert("Please enter a city name.");
  }
});
