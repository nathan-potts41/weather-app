var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&units=imperial&appid=a41a732753ea4b9aa10d848013b989de";
var forecastDayContainerEl = $("#forecastDay");



// function fetching the city from the api
var getCity = function (event) {
    event.preventDefault();
    var cityEntry = $("#city-search");
    var city = $.trim(cityEntry.val());

    getCityData(city);
};

// function fetching the json data for above city
var getCityData = function (city) {
    var searchStr = fetch(weatherUrl + city + apiKey)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data.list)
                });
        });
    displayForecast(searchStr);
}

// function for current day forecast
var displayForecast = function (searchStr) {
    var weatherContainer = document.getElementById("currentForecast")

    var temp = document.createElement("p")
    temp.innerHTML = 'Temperature: ' + searchStr.list;

    var humidity = document.createElement("p")
    humidity.innerHTML = 'Humidity:' + searchStr.humidity;

    var windSpeed = document.createElement("p")
    windSpeed.innerHTML = 'Wind Speed:' + searchStr.wind;

    var feelsLike = document.createElement("p")
    feelsLike.innerHTML = 'Feels Like:' + searchStr.feels_like;

    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(windSpeed);
    weatherContainer.appendChild(feelsLike);

    // for (var i = 0; i < searchStr.length; i++) {
    //     var div = document.createElement("p")
    //     div.innerHTML = 'Temperature:' + searchStr[i].temp;
    //     div.innerHTML = 'Humidity:' + searchStr[i].humidity;
    //     div.innerHTML = 'Wind Speed:' + searchStr[i].wind;
    //     div.innerHTML = 'Feels Like:' + searchStr[i].feels_like;

    //     weatherContainer.appendChild(div);
    // }


};

// // function for 5 day forcast
// var display5Day = function () {


// }

// $('#city-search').ready(getCityData);
document.getElementById("submit").addEventListener("click", getCity);


