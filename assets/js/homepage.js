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
    fetch(weatherUrl + city + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        var weatherContainer = document.getElementById("currentForecast");
                        var cityTitle = document.getElementById("cityName");

                        var title = document.createElement("h2")
                        title.innerHTML = $("#city-search").val() + " " + moment().format("(MM / D / YYYY)");

                        var temp = document.createElement("p")
                        temp.innerHTML = 'Temperature: ' + data.list[0].main.temp;

                        var humidity = document.createElement("p")
                        humidity.innerHTML = 'Humidity: ' + data.list[0].main.humidity;

                        var windSpeed = document.createElement("p")
                        windSpeed.innerHTML = 'Wind Speed: ' + data.list[0].wind.speed;

                        var feelsLike = document.createElement("p")
                        feelsLike.innerHTML = 'Feels Like: ' + data.list[0].main.feels_like;

                        cityTitle.appendChild(title);
                        weatherContainer.appendChild(temp);
                        weatherContainer.appendChild(humidity);
                        weatherContainer.appendChild(windSpeed);
                        weatherContainer.appendChild(feelsLike);
                    });
            } else {
                alert('Your search did not work, please make sure you entered the city correctly.');
            }

        });
};

// function for current day forecast
var displayForecast = function () {



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

$("#submit").on("click", function () {
    $("#cityName").empty();
    $("#currentForecast").empty();
});
$("#submit").on("click", getCity);



