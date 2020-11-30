//function fetching the data from the api
var getCityData = function () {
    event.preventDefault();
    var cityEntry = document.getElementById("city-search").value;
    var searchStr = fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityEntry + "&appid=a41a732753ea4b9aa10d848013b989de")
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data)
            });
        });
};


// var displayData = function () {

// }

// document.addEventListener("load", )
document.getElementById("submit").addEventListener("click", getCityData);


