// find city
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en

// fetch weather
// https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&appid=b41ec3be35c7dac8aabbc21ba253137a

let searchBox = document.getElementById("city-name")
let searchButton = document.getElementById("input-submit")
let locationSearch = document.querySelector(".current-loc")

// fetching data on search button click
searchButton.addEventListener("click", function () {
    fetchData(searchBox.value)
})

// fetching city name on current location click
const success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => fetchData(data.localityInfo.administrative[4].name))

}

// error if location access denied
const error = () => {
    alert("cannot retrieve location")
}

// fetching lat and long on current location click
locationSearch.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(success, error)
})

// updating the DOM with retreived weather details
function updateDOM(data) {
    console.log(data);

    // updating weather image
    let weatherImg = document.getElementById("weather-img")
    if (data.weather[0].main == "Rain") {
        weatherImg.src = "./img/rain.png"
    } else if (data.weather[0].main == "Clear") {
        weatherImg.src = "./img/clear.png"
    } else if (data.weather[0].main == "Clouds") {
        weatherImg.src = "./img/clouds.png"
    } else if (data.weather[0].main == "Drizzle") {
        weatherImg.src = "./img/drizzle.png"
    } else if (data.weather[0].main == "Mist") {
        weatherImg.src = "./img/mist.png"
    } else if (data.weather[0].main == "Snow") {
        weatherImg.src = "./img/snow.png"
    }

    document.getElementById("temperature").innerText = (data.main.temp - 273.15).toFixed(1) + "°C";
    document.getElementById("city-name-output").innerText = data.name
    document.getElementById("wind-speed").innerText = data.wind.speed + "km/hr";
    document.getElementById("humidity").innerText = data.main.humidity + "%"
}

// fetching weather data
function fetchData(input) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=b41ec3be35c7dac8aabbc21ba253137a`)
        .then(response => response.json())
        .then(data => {
            if(data.message){
                alert(data.message)
            }else{
                document.querySelector(".more-details").style.display="flex"
                updateDOM(data)
            }
        });
}

