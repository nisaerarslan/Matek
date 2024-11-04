const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
let lastCity = ''; // Son aranan şehir bilgisini tutmak için

search.addEventListener('click', () => {
    const APIKey = '6e9397b0e267d47369da6aa441cc5888';
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value;

    if (city === '')
        return;

    // Eğer aynı şehir tekrar aranıyorsa işlem yapma
    if (lastCity === city) {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;

                case 'Rain':
                    image.src = 'rain.png';
                    break;

                case 'Snow':
                    image.src = 'snow.png';
                    break;

                case 'Clouds':
                    image.src = 'cloud.png';
                    break;

                case 'Haze':
                    image.src = 'mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>Â°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

            // Son aranan şehir bilgisini güncelle
            lastCity = city;
        });
});

// Bu kısım, sayfa yüklendiğinde veya herhangi bir event olmadığında
// bile son aranan şehir bilgisini güncel tutarak ilk durumu korur.
lastCity = document.querySelector('.search-box input').value;