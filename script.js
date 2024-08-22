const apiKey = 'd2bf9413faa5be458883a34dc7be26f0';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

function celsiusToFahrenheit(celsius) {
    return Math.round(celsius * 9/5) + 32;
}

async function checkWeather(city, cityClass = '') {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if(response.status === 404){
        if (cityClass === '') {
            document.querySelector('.error').style.display = 'block';
            document.querySelector('.weather').style.display = 'none';
        }
    } else {
        let data = await response.json();
        document.querySelector(`.city${cityClass}`).innerHTML = data.name;
        const celsius = data.main.temp;
        document.querySelector(`.temp${cityClass}`).innerHTML = Math.round(celsius)  + `°C - ${celsiusToFahrenheit(celsius)}°F`;
        document.querySelector(`.humidity${cityClass}`).innerHTML = data.main.humidity + '%';
        document.querySelector(`.wind${cityClass}`).innerHTML = Math.round(data.wind.speed * 3) + ' km/h';

        const timezone = data.timezone;
        const timeDifference = timezone - 7200;
        const currentTime = new Date();
        const offsetTime = new Date(currentTime.getTime() + (timeDifference * 1000));

        const hours = offsetTime.getHours().toString().padStart(2, '0');
        const minutes = offsetTime.getMinutes().toString().padStart(2, '0');
        document.querySelector(`.time${cityClass}`).innerHTML = `${hours}:${minutes}`;

        const weatherIcon = document.querySelector(`.weather-icon${cityClass}`);

        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = 'img/clouds.png';
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = 'img/clear.png';
        }
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'img/rain.png';
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'img/drizzle.png';
        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = 'img/mist.png';
        }
        else if(data.weather[0].main == 'Snow'){
            weatherIcon.src = 'img/snow.png';
        }

        if (cityClass === '') {
            document.querySelector('.weather').style.display = 'block';
            document.querySelector('.error').style.display = 'none';
        }
    }
}

function startWeatherUpdates(city, cityClass = '') {
    let lastMinute = new Date().getMinutes();

    setInterval(() => {
        let currentMinute = new Date().getMinutes();
        if (currentMinute !== lastMinute) {
            lastMinute = currentMinute;
            checkWeather(city, cityClass);
        }
    }, 1000);
}

checkWeather('zürich', '1');
checkWeather('brighton', '3');

startWeatherUpdates('zürich', '1');
startWeatherUpdates('brighton', '3');

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value, '2');
    startWeatherUpdates(searchBox.value, '2');
});


searchBox.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
        startWeatherUpdates(searchBox.value);
    }
});
