// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

// d5e4ae7d9f7a015268a75f16b21c662d weather API key

$(document).ready(function () {
  //var searchInput = $("#search-results")
  var cityInput = $("#citySearch");
  var tempInput = $("#temperatureSearch");
  var humidInput = $("#humiditySearch");
  var windInput = $("#windSearch");
  var uvInput = $("#uvSearch");
  var clearButton = $("#clearButton");
  var pastSearch = JSON.parse(localStorage.getItem("search")) || [];
  var clearSearch = $(".clear")
  console.log(pastSearch);
  

  var api_key = "d5e4ae7d9f7a015268a75f16b21c662d";

  

  $("#search").on("click", function (event) {
        //get the user inputs
            var userInput = $("#search-input").val();
        //clear the user inputs
        $("#search-input").val("");
        //generate the current weather data
        generateCurrentWeatherData(userInput);
        //generate forecast dataType
        generateForecastData(userInput);
        //create a button + add the event listener
        pastSearch.push(userInput);
        localStorage.setItem("search",JSON.stringify(pastSearch));
        renderSearchHistory()
            console.log(pastSearch);
        
            
            
  });

  $(".clear").on("click", function() {
        pastSearch = []
        renderSearchHistory()
  })


  var renderSearchHistory = function(input) {
      var currentWeatherURL = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`;
      $.ajax({
            type: "GET",
            url: currentWeatherURL,
            dataType: "json",
            success: function(data) {
                  console.log("data: ",data);
                  //create new searchhistory markup - html
                  var searchHistoryMarkup = `
                        <div class="card">
                              <div class="card-body">
                                    <h3 class="card-title">
                                    ${data.name}
                                    </h3>
                               </div>
                        </div>
                  `;
                  //inject the html into the continer where curent weather will show
                  $(".search-history").html(searchHistoryMarkup);
                  
            }
      }); 
  }


  var generateCurrentWeatherData = function(input) {
      var currentWeatherURL = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`;
      $.ajax({
            type: "GET",
            url: currentWeatherURL,
            dataType: "json",
            success: function(data) {
                  //console.log("data: ",data);
                  //create new weather markup - html
                  var currentWeatherMarkup = `
                        <div class="card">
                              <div class="card-body">
                                    <h3 class="card-title">
                                          ${data.name} (${new Date().toLocaleDateString()})
                                          <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
                                    </h3>
                                    <p class="card-text">Temperature: ${data.main.temp} °F</p>
                                    <p class="card-text">Humidity: ${data.main.humidity}%</p>
                                    <p class="card-text">Wind Speed: ${data.wind.speed} MPH</p>
                              </div>
                        </div>
                  `;
                  //inject the html into the continer where curent weather will show
                  $("#current-weather").html(currentWeatherMarkup);
                  
            }
      });
  }

  var generateForecastData = function(input) {
      var currentWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${api_key}`;
      $.ajax({
            type: "GET",
            url: currentWeatherURL,
            dataType: "json",
            success: function(data) {
                  // console.log("data: ",data);
                  var forecastString = "";
                  for(var i=0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.indexOf("12:00:00") > -1) {

                              //create new weather markup - html
                              var forecastMarkup = `
                                    <div class="col-md-3">
                                          <div class="card bg-primary text-white">
                                                <div class="card-body p-3">
                                                      <h5 class="card-title">${data.list[i].dt_txt}</h5>
                                                      
                                                      <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
                                                      <p class="card-text">Temp: ${data.list[i].main.temp} °F </p>
                                                      <p class="card-text">Humidity: ${data.list[i].main.humidity} %</p>
                                                </div>
                                          </div>
                                    </div>
                              `;
                              forecastString += forecastMarkup;
                        }
                  }
                  //inject the html into the continer where curent weather will show
                  $("#forecast").html(forecastString);

            }
      });

      
  }

  
  
  
});

//     