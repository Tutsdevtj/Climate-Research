//Variáveis e seleção de elementos
const apiKey = "f5f2e16df6a31cee857839ddabb1cfbe";
const apiCountryUrl = "https://flagsapi.com/${city}/flat/32.png"


const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const weatherData2Element = document.querySelector("#weather-data2")
const weatherDataElement = document.querySelector("#weather-data")
const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")
const loadingElement = document.querySelector(".hideLoad")

// Funções

const getWeatherData = async (city) => {

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();



    return data;
};

const showWeatherData = async (city) => {

    try {
        weatherDataElement.classList.add("hide");
        loadingElement.classList.remove("hideLoad");
        const data = await getWeatherData(city);



        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        humidityElement.innerText = data.main.humidity + "%";
        windElement.innerText = data.wind.speed + "km/h";
        countryElement.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;
        weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        loadingElement.classList.add("hideLoad");
        weatherDataElement.classList.remove("hide");
        weatherData2Element.classList.add("hideError");

    }
    catch (error) {
        loadingElement.classList.add("hideLoad");
        weatherDataElement.classList.add("hide")
        weatherData2Element.classList.remove("hideError")
        console.error("Um erro aconteceu durante a busca!");
        console.error("Detalhes do erro:", error.message);

        return null;



    } finally {



    }



};




//Eventos
searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)


})

cityInput.addEventListener("keyup", (e) => {

    if (e.code == "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})