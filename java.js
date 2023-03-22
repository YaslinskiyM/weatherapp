$(document).ready(function(){
    $('#submit').click(function(){
        var city = $('#city').val();
        //var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + `&appid=33b9452885ff138678dfed0ea34013d5&units=metric`;
        var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + `&appid=33b9452885ff138678dfed0ea34013d5&units=metric&units=metric`;
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + `&appid=33b9452885ff138678dfed0ea34013d5&units=metric&units=metric`;

        $.getJSON(currentWeatherUrl, function(data){
            var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var temp = Math.round(data.main.temp);
            var weather = data.weather[0].main;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var description = data.weather[0].description;

            var resultHTML = '<div>City: ' + city + '</div>' +
                              '<div>Temperature: ' + temp + '°C</div>' +
                              '<div>Humidity: ' + humidity + '%</div>'+
                              '<div>Windspeed: ' + windSpeed + 'mph</div>'+
                              '<div>Weather: ' + weather + '</div>' +
                              '<div>Description: ' + description + '</div>' +
                              '<div><img src="' + icon + '"></div>';

            $('#result').html(resultHTML);
        });

          // Get 5-day forecast data
          $.getJSON(forecastUrl, function(forecastData){
            var forecastHTML = '';
            for (var i = 0; i < forecastData.list.length; i += 8) {
                var forecastDate = new Date(forecastData.list[i].dt * 1000);
                var forecastIcon = "https://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";
                var forecastTemp = Math.round(forecastData.list[i].main.temp);
                var forecastWeather = forecastData.list[i].weather[0].main;
                var forecastDescription = forecastData.list[i].weather[0].description;

                forecastHTML += '<div><strong>' + forecastDate.toDateString() + '</strong></div>' +
                                '<div>Temperature: ' + forecastTemp + '°C</div>' +
                                '<div>Weather: ' + forecastWeather + '</div>' +
                                '<div>Description: ' + forecastDescription + '</div>' +
                                '<div><img src="' + forecastIcon + '"></div>';
            }

            $('#forecast').html(forecastHTML);
        });
    });
});

