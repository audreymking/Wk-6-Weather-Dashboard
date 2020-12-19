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

  var api_key = "d5e4ae7d9f7a015268a75f16b21c662d";

  $("#search").on("click", function (event) {
        //get the user inputs
            var userInput = $("#search-input").val();
        //clear the user inputs
        $("#search-input").val("");
        //generate the current weather data
        generateCurrentWeatherData(userInput);
        //generate forcast dataType
        generateForcastData(userInput);
        //create a button + add the event listener
            createButton();
            $(".citybutton").addEvenListener()

  });

  var generateCurrentWeatherData = function(input) {
      var currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`;
      $.ajax({
            type: "GET",
            url: currentWeatherURL,
            dataType: "json",
            success: function(data) {
                  console.log("data: ",data);
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

  var generateForcastData = function(input) {
      var currentWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${api_key}`;
      $.ajax({
            type: "GET",
            url: currentWeatherURL,
            dataType: "json",
            success: function(data) {
                  console.log("data: ",data);
                  var forcastString = "";
                  for(var i=0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.indexOf("12:00:00") > -1) {

                              //create new weather markup - html
                              var forcastMarkup = `
                                    <div class="col-md-2">
                                          <div class="card bg-primary text-white">
                                                <div class="card-body p-2">
                                                      <h5 class="card-title">12/19/2020</h5>
                                                      <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
                                                      <p class="card-text">Temp: 19.15 °F</p>
                                                      <p class="card-text">Humidity: 82%</p>
                                                </div>
                                          </div>
                                    </div>
                              `;
                              forcastString += forcastMarkup;
                        }
                  }
                  //inject the html into the continer where curent weather will show
                  $("#forecast").html(forcastString);

            }
      });
  }
});

//     if (event.keyCode == 13) {
//           event.preventDefault()
//           var searchTerm = $("#search").val()
//           var searchURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + api_key
//           console.log(searchURL)
//           $.ajax({
//                 url: searchURL,
//                 method: "GET"
//           }).then(function (response) {
//                 console.log(response)
//                 cityInput.text(response.city.name)
//                 console.log(cityInput)
//             //     tempInput.text(response.hits[0].recipe.label)
//             //     for (i = 0; i < response.hits[0].recipe.ingredients.length; i++) {
//             //           newIngredient = $("<li>")
//             //           newIngredient.text(response.hits[0].recipe.ingredients[i].text)
//             //           ingredientsList.append(newIngredient)
//             //     }
//           })

//     }
