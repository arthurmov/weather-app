const container = document.querySelector('.container');
const search = document.querySelector('#search-btn');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'insert key here';
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            if (!json.weather || json.weather.length === 0 || !json.main) {
                throw new Error("Weather data is missing.");
            }

            // Hide error message if city is valid
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Select weather elements
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Determine weather icon
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './images/clear-weather.png';
                    break;
                case 'Rain':
                    image.src = './images/rainy-weather.png';
                    break;
                case 'Snow':
                    image.src = './images/snowy-weather.png';
                    break;
                case 'Clouds':
                    image.src = './images/cloudy-weather.png';
                    break;
                case 'Mist':
                    image.src = './images/misty-weather.png';
                    break;
                default:
                    image.src = './images/default-weather.png';
            }

            // Update weather details
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;

            // Show weather box and details
            weatherBox.style.display = 'flex';
            weatherDetails.style.display = 'flex';
            weatherBox.style.opacity = '1';
            weatherBox.style.scale = '1';
            weatherDetails.style.opacity = '1';
            weatherDetails.style.scale = '1';

            container.style.height = '590px';
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);

            // Show error message for invalid city or API issues
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            alert("Failed to fetch weather data. Please check the city name or API key.");
        });
});
