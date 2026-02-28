const inputBox = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');
const weather = document.querySelector('.weather');
const errorMessage = document.querySelector('.error');

async function checkWeather(city) {
    const apiKey = '5a3bd2e43ea843a50e1fdd71ec842f90';
    // CAMBIO CLAVE: Usamos 'q=' para ciudad y '&units=metric' para Celsius
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(apiUrl);
        
        if (response.status == 404) {
            errorMessage.style.display = "block";
            weather.style.display = "none";
        } else {
            const data = await response.json();
            console.log(data);
            updateWeatherUI(data);
            errorMessage.style.display = "none";
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

function updateWeatherUI(data) {
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;

    const weatherIcons = {
        Clear: 'images/clear.png',
        Snow: 'images/snow.png',
        Rain: 'images/rain.png',
        Drizzle: 'images/drizzle.png',
        Mist: 'images/mist.png',
        Clouds: 'images/clouds.png'
    };

    // Buscamos el icono según el estado del clima
    const status = data.weather[0].main;

    weather.style.display = 'block';
}

// Escuchador para el botón
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});