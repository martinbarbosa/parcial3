document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'd3c39f57206d5904890771c822ffaac3'; 

    const nombreCiudad = document.querySelector(".search input");
    const buscarCiudad = document.querySelector(".search button");
    const tarjetaClima = document.querySelector(".weather");
    const errorTarjeta = document.querySelector(".error");
    const imagenclima = document.querySelector(".weather-icon")
    buscarCiudad.addEventListener("click", function () {
        const cityName = nombreCiudad.value;

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
                errorTarjeta.style.display= "block"
                tarjetaClima.style.display = "none";
            });
    }

    function displayWeatherData(weatherData) {
        const weatherIcon = document.querySelector(".weather-icon");
        const temperature = document.querySelector(".temp");
        const city = document.querySelector(".city");
        const humidity = document.querySelector(".humidity");
        const windSpeed = document.querySelector(".wind");

       
        temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
        city.textContent = weatherData.name;
        humidity.textContent = `${weatherData.main.humidity}%`;
        windSpeed.textContent = `${weatherData.wind.speed} km/h`;

        tarjetaClima.style.display = "block";
        errorTarjeta.style.display = "none";

        const condClima = weatherData.weather[0]["main"]
        if(condClima === "Clouds"){
            imagenclima.src= "images/clouds.png"
        } else if(condClima === "Clear"){
            imagenclima.src= "images/clear.png"
        }else if(condClima === "Drizzle"){
            imagenclima.src= "images/drizzle.png"
        }else if(condClima === "Humidity"){
            imagenclima.src= "images/humidity.png"
        }else if(condClima === "Mist"){
            imagenclima.src= "images/mist.png"
        }else if(condClima === "Rain"){
            imagenclima.src= "images/rain.png"
        }else if(condClima === "Snow"){
            imagenclima.src= "images/snow.png"
        }
        

    }

    


    function showError(message) {
        const errorMessage = document.querySelector(".error p");
        errorMessage.textContent = message;

        tarjetaClima.style.display = "none";
        errorTarjeta.style.display = "block";
    }
});