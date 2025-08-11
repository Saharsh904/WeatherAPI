document.addEventListener('DOMContentLoaded', () => {
    const inputCity = document.getElementById("input-city");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    /*
        const API_KEY = "your_api_key";
        while running the code, make sure to add the api keys.
    */

    getWeatherBtn.addEventListener('click', async () => {
        const city = inputCity.value.trim();
        if (!city) {
            return;
        }

        /*
            During a api call to some other server/databse, two things are very common:-
            1. The response may give error
            -- To bypass the error or to prevent application to crash wrap the code in try catch block.
            try {
            --> logic
            }
            catch (exception e) {
            --> error message
            } 



            2. It may take sometime to receive the response (could be microsec, milisec, or sec),beacuse the server can be placed in a different continent.
            -- So use async await
        */

        try {
            const weatherInfo = await fetchWeatherInfo(city);
            displayWeatherInfo(weatherInfo);
        }
        catch {
            displayError();
        }
    });

    async function fetchWeatherInfo(city) {
        //get weather info for a city
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;

        const response = await fetch(url);
        if(!response.ok) {
            throw new Error();
        }
        const weatherInfo = await response.json();
        return weatherInfo;
    }

        function displayWeatherInfo(weather) {
            //console.log(weather);

            cityName.textContent = `City Name: ${weather.name}`;
            temperature.textContent = `Temperature: ${weather.main.temp}`;
            description.textContent = `Weather: ${weather.weather[0].description}`;

            weatherInfo.classList.remove('hidden');
            errorMessage.classList.add('hidden');

        }

        function displayError() {
            weatherInfo.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
});


