// inputted city weather api
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var apiKey = "&units=imperial&appid=a41a732753ea4b9aa10d848013b989de";

// inputted city uv index api
var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=";
var lonParam = "&lon=";
var uvKey = "&appid=a41a732753ea4b9aa10d848013b989de";

var cities = [];

// function fetching the city from the api
var getCity = function (event) {
    event.preventDefault();
    var cityEntry = $("#city-search");
    var city = $.trim(cityEntry.val());

    getCityData(city);
};

//function to display search history in the left column of the app
var searchHistory = function () {
    cities = JSON.parse(localStorage.getItem('cities'));
    if (!cities) {
        cities = [];
        return;
    } else {
        for (var i = 0; i < cities.length; ++i) {
            //BCS learning assistant advised to do this with less jQuery
            var historyEl = document.createElement('p');
            historyEl.textContent = cities[i];
            historyEl.classList = 'clear list-group-item btn btn-light';
            $('#search-history').append(historyEl);
        }
    }
};

// function fetching the json data for above city
var getCityData = function (city) {
    fetch(weatherUrl + city + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        // console.log(data)

                        // dynamically generated html loaded into page
                        var weatherContainer = document.getElementById("currentForecast");

                        var cityName = data.city.name;

                        var title = document.createElement("h3")
                        title.innerHTML = cityName + " " + moment().format("(MM/D/YYYY)");

                        var icon = document.createElement("img")
                        icon.src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";

                        var temp = document.createElement("p")
                        temp.innerHTML = 'Temperature: ' + data.list[0].main.temp + " ˚F";

                        var feelsLike = document.createElement("p")
                        feelsLike.innerHTML = 'Feels Like: ' + data.list[0].main.feels_like + " ˚F";

                        var humidity = document.createElement("p")
                        humidity.innerHTML = 'Humidity: ' + data.list[0].main.humidity + " %";

                        var windSpeed = document.createElement("p")
                        windSpeed.innerHTML = 'Wind Speed: ' + data.list[0].wind.speed + " mph";


                        weatherContainer.append(title);
                        title.append(icon);
                        weatherContainer.appendChild(temp);
                        weatherContainer.appendChild(feelsLike);
                        weatherContainer.appendChild(humidity);
                        weatherContainer.appendChild(windSpeed);


                        var lat = data.city.coord.lat;
                        var lon = data.city.coord.lon;

                        myStorage(cityName);
                        displayForecast(lat, lon);

                        // dynamically generating the uv index
                        fetch(uvUrl + lat + lonParam + lon + uvKey)
                            .then(function (uvresponse) {
                                if (uvresponse.ok) {
                                    uvresponse.json()
                                        .then(function (uvdata) {

                                            var uvIndex = document.createElement("p")

                                            if (uvdata.value < 2) {
                                                uvIndex.classList.add("mild");
                                            } else if (uvdata.value > 2 && uvdata.value <= 4) {
                                                uvIndex.classList.add("moderate");
                                            } else if (uvdata.value >= 4 && uvdata.value < 7) {
                                                uvIndex.classList.add("high");
                                            } else if (uvdata.value >= 7) {
                                                uvIndex.classList.add("severe");
                                            };
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
var displayForecast = function (lat, lon) {
    var fetchMe = oneCallUrl + lat + lonParam + lon + apiKey;
    // console.log(fetchMe);
    fetch(fetchMe)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {

                        // splices the data to only 5 days
                        var forecastArray = data.daily;
                        forecastArray.splice(5, 3);

                        //html loaded into 5 day forecast
                        for (i = 0; i < data.daily.length; i++) {

                            var weeklyForecast = document.querySelector(".card-deck");
                            var dailyWeather = document.createElement("div")
                            dailyWeather.className = "card bg-primary mb-3 day";

                            var date = document.createElement("h6");
                            date.innerHTML = moment()
                                .add(i + 1, 'days')
                                .format("MM/D/YYYY");

                            var icon = document.createElement("img")
                            icon.src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png";

                            var temperature = document.createElement("p");
                            temperature.innerHTML = "Temp: " + data.daily[i].temp.day + " ˚F";

                            var humidity = document.createElement("p");
                            humidity.innerHTML = "Humidity: " + data.daily[i].humidity + " %";

                            dailyWeather.appendChild(date);
                            dailyWeather.appendChild(icon);
                            dailyWeather.appendChild(temperature);
                            dailyWeather.appendChild(humidity);
                            weeklyForecast.appendChild(dailyWeather);
                        };
                    });
            };
        });

};

// checks for existing city, shifts if there are more than 8, sets in local storage
var myStorage = function (cityName) {
    if (cities.includes(cityName)) {
        return;
    } else {
        cities.push(cityName);

        if (cities.length > 8) {
            cities.shift();
        }
        localStorage.setItem("cities", JSON.stringify(cities));
        $('.clear').each(function () {
            $(this).remove();
        });
        searchHistory();
    }

}

// function calling on a previous search term 
var clickHistory = function () {
    var search = $(this).text().trim();
    getCityData(search);
};


// clears out any current values on the page
var clearStuff = function () {
    $("#cityName").empty();
    $("#currentForecast").empty();
    $(".card-deck").empty();
};

// empties divs so they can be repopulated with new info
$("#submit").on("click", function () {
    $("#cityName").empty();
    $("#currentForecast").empty();
    $(".card-deck").empty();
});

$("#submit").on("click", getCity);

$('#search-history').on('click', '.clear', clearStuff);
$('#search-history').on('click', '.clear', clickHistory);



