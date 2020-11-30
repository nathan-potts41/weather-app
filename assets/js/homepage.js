var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
var apiKey = "&appid=a41a732753ea4b9aa10d848013b989de"
// function fetching the city from the api
var getCity = function (event) {
    event.preventDefault();
    var cityEntry = $("#city-search");
    var city = $.trim(cityEntry.val());
    console.log(city);

    getCityData(city);
};

// function fetching the json data for above city
var getCityData = function (city) {
    var searchStr = fetch(weatherUrl + city + apiKey)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data)
            });
        });
}

// function for current day forecast
var displayForecast = function () {
    
}

// function for 5 day forcast
// var display5Day = function () {
//     
// }

// $('#city-search').ready(getCityData);
document.getElementById("submit").addEventListener("click", getCity);


