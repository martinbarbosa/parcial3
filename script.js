document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'd3c39f57206d5904890771c822ffaac3'; 

    const searchInput = document.querySelector(".search input");
    const searchButton = document.querySelector(".search button");
    const weatherCard = document.querySelector(".weather");
    const errorCard = document.querySelector(".error");

    searchButton.addEventListener("click", function () {
        const cityName = searchInput.value.trim();

        if (cityName !== "") {
            getWeatherData(cityName, apiKey);
        } else {
            showError("Por favor, ingresa el nombre de la ciudad.");
        }
    });

    function getWeatherData(cityName, apiKey) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;

        axios.get(apiUrl)
            .then(function (response) {
                const weatherData = response.data;
                displayWeatherData(weatherData);
            })
            .catch(function (error) {
                showError("No se pudo obtener la información del tiempo para la ciudad ingresada.");
            });
    }

    function displayWeatherData(weatherData) {
        const weatherIcon = document.querySelector(".weather-icon");
        const temperature = document.querySelector(".temp");
        const city = document.querySelector(".city");
        const humidity = document.querySelector(".humidity");
        const windSpeed = document.querySelector(".wind");

        weatherIcon.src = `images/${getWeatherIcon(weatherData.weather[0].icon)}.png`;
        temperature.textContent = `${weatherData.main.temp.toFixed(1)}°C`;
        city.textContent = weatherData.name;
        humidity.textContent = `${weatherData.main.humidity}%`;
        windSpeed.textContent = `${weatherData.wind.speed.toFixed(1)} km/h`;

        weatherCard.style.display = "block";
        errorCard.style.display = "none";
    }

    function getWeatherIcon(iconCode) {
        // Mapear códigos de iconos de OpenWeatherMap a nombres de archivos locales
        const iconMappings = {
            "01d": "clear-sky-day",
            "01n": "clear-sky-night",
            "02d": "few-clouds-day",
            "02n": "few-clouds-night",
            "03d": "scattered-clouds",
            "03n": "scattered-clouds",
            "04d": "broken-clouds",
            "04n": "broken-clouds",
            "09d": "shower-rain",
            "09n": "shower-rain",
            "10d": "rain-day",
            "10n": "rain-night",
            "11d": "thunderstorm-day",
            "11n": "thunderstorm-night",
            "13d": "snow-day",
            "13n": "snow-night",
            "50d": "mist-day",
            "50n": "mist-night",
        };

        return iconMappings[iconCode] || "unknown";
    }

    function showError(message) {
        const errorMessage = document.querySelector(".error p");
        errorMessage.textContent = message;

        weatherCard.style.display = "none";
        errorCard.style.display = "block";
    }
});