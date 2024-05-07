// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '7013d8258443950394e5c75c04b03fe3';

let search_city = ''
let modul = false

function handleSearchClick() {
    search_city = document.getElementById('default-search').value;
    getWeatherForecast();
    console.log(search_city !== "");
    if (search_city !== "") {
        modul = true
        obucModal()
    }
}
document.getElementById('search-button').addEventListener('click', handleSearchClick);



async function getWeatherForecast() {
   
    obucModal();
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search_city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract daily weather forecast for the next 7 days
        const dailyForecast = data.list.filter((item, index) => index % 8 === 0 && index < 8 * 7);

        // Update <p> tags with weather information
        dailyForecast.forEach((forecast, index) => {
            const day = new Date(forecast.dt * 1000).toLocaleDateString('hr-HR', { weekday: 'long' });
            const temperature = forecast.main.temp;
        
            document.getElementById(`day${index + 1}`).innerText = `${day}: ${temperature}°C`;
        });
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function obucModal(){
    let modulWindow = document.getElementById("modulWindow");

    if (modul) {
        modulWindow.style.display = "block"
    }else{
        modulWindow.style.display = "none"
    }
}

    // Call the function to fetch weather forecast when the page loads
    window.onload = getWeatherForecast;