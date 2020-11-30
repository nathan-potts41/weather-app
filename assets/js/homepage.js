var getCityData = function () {
    var cityEntry = document.querySelector("#city-search").value;
    var searchStr = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityEntry + "&appid=96113c7d8fc2e884ca4452fa7e3dbdd7"

    fetch(searchStr).then(function (response) {
        return response.json();
    })
        .then(function (response) {
            console.log(response.data);
            
            var responseContainerEl = document.querySelector(".day")

            responseContainerEl.innerHTML = "";
            
        })
};

getCityData();