// inputted city weather api
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&units=imperial&appid=a41a732753ea4b9aa10d848013b989de";

// inputted city uv index api
var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=";
var lonData = "&lon=";
var uvKey = "&appid=a41a732753ea4b9aa10d848013b989de";


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

                        // dynamically generated htmlloaded into page
                        var weatherContainer = document.getElementById("currentForecast");
                        var cityTitle = document.getElementById("cityName");

                        var title = document.createElement("h3")
                        title.innerHTML = $("#city-search").val() + " " + moment().format("(MM / D / YYYY)");

                        var icon = document.createElement("img")
                        icon.src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";

                        var temp = document.createElement("p")
                        temp.innerHTML = 'Temperature: ' + data.list[0].main.temp + " ˚F";

                        var humidity = document.createElement("p")
                        humidity.innerHTML = 'Humidity: ' + data.list[0].main.humidity + " %";

                        var windSpeed = document.createElement("p")
                        windSpeed.innerHTML = 'Wind Speed: ' + data.list[0].wind.speed + " mph";

                        var feelsLike = document.createElement("p")
                        feelsLike.innerHTML = 'Feels Like: ' + data.list[0].main.feels_like + " ˚F";

                        cityTitle.append(title);
                        title.append(icon);
                        weatherContainer.appendChild(temp);
                        weatherContainer.appendChild(humidity);
                        weatherContainer.appendChild(windSpeed);
                        weatherContainer.appendChild(feelsLike);

                        var lat = data.city.coord.lat;
                        var lon = data.city.coord.lon;

                        fetch(uvUrl + lat + lonData + lon + uvKey)
                            .then(function (uvresponse) {
                                if (uvresponse.ok) {
                                    uvresponse.json()
                                        .then(function (uvdata) {
                                            console.log(uvdata);

                                            var uvIndex = document.createElement("p")
                                            uvIndex.innerHTML = 'UV Index: ' + uvdata.value;

                                            weatherContainer.appendChild(uvIndex);
                                        });
                                };
                            });
                    });
            } else {
                alert('Your search did not work, please make sure you entered the city correctly.');
            }

        });

};

// function for weekly forecast
var displayForecast = function () {


};


// $('#city-search').ready(getCityData);

// clears out any current values on the page
$("#submit").on("click", function () {
    $("#cityName").empty();
    $("#currentForecast").empty();
});
$("#submit").on("click", getCity);



