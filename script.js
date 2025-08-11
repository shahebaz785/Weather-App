const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "61dba2deff8ddd4ed87bce61fb43bbbd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex"; // error picture display on.
        weather_body.style.display = "none"; // other Data hide
        console.log("error");
        return;
    }

    location_not_found.style.display = "none"; // error picture hide
    weather_body.style.display = "flex"; // other data display on.

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/image/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/image/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/image/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/image/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/image/snow.png";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});