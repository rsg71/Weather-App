$(document).ready(function () {
    // // This is our API key. Add your own API key between the ""
    var APIKey = "03de5e028a39ba0da41025c49291b0de";

    var cityName = $("#city-name");
    var temperature = $("#temperature");
    var humidity = $("#humidity");
    var wind = $("#wind");
    var UV = $("#UV");






    $("#search-button").on("click", function (event) {
        event.preventDefault();



        var cityInput = $("#city-input").val();


        


        // getting the current date with Moment.js?




        localStorage.setItem("city-input", cityInput);
        // renderWeatherData();



        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response)
            var cityNameEl = response.name;
            cityName.text(cityNameEl);

            var todayDate = $("#currentDay");
            var date = moment().format('l');
            todayDate.text(date)




            //back to the data grab
            var tempElFahrenheit = parseFloat(response.main.temp);
            tempElFahrenheit = ((tempElFahrenheit - 273.15) * 1.80 + 32).toFixed(2);
            temperature.text("Temperature: " + tempElFahrenheit + " °F");

            var humidityEl = response.main.humidity;
            humidity.text("Humidity: " + humidityEl + "%");

            var windEl = response.wind.speed;
            wind.text("Wind Speed: " + windEl + " mph");


            // lat an lon from first call: 
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // -------------now I am finding the UV index and getting the 5 day forecast ----------------------------------

            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var UVEl = parseFloat(response.current.uvi).toFixed(2);
                UV.text("UV Index: " + UVEl);


                // var forecastTemp = $(".forecast-temp");
                // forecastTemp.each(function(index) {
                //     forecastTemp.text("Temp: " + response.daily[index].temp.day + " °F");

                //    //same for humidity     
                // })


                var forecastTemp1 = parseFloat(response.daily[1].temp.day)
                forecastTemp1 = ((forecastTemp1 - 273.15) * 1.80 + 32).toFixed(2);

                var forecastTemp2 = parseFloat(response.daily[2].temp.day)
                forecastTemp2 = ((forecastTemp2 - 273.15) * 1.80 + 32).toFixed(2);

                var forecastTemp3 = parseFloat(response.daily[1].temp.day)
                forecastTemp3 = ((forecastTemp3 - 273.15) * 1.80 + 32).toFixed(2);

                var forecastTemp4 = parseFloat(response.daily[1].temp.day)
                forecastTemp4 = ((forecastTemp4 - 273.15) * 1.80 + 32).toFixed(2);

                var forecastTemp5 = parseFloat(response.daily[1].temp.day)
                forecastTemp5 = ((forecastTemp5 - 273.15) * 1.80 + 32).toFixed(2);




                $(".Temp1").text("Temp: " + forecastTemp1 + " °F");
                $(".Temp2").text("Temp: " + forecastTemp2 + " °F");
                $(".Temp3").text("Temp: " + forecastTemp3 + " °F");
                $(".Temp4").text("Temp: " + forecastTemp4 + " °F");
                $(".Temp5").text("Temp: " + forecastTemp5 + " °F");


                $(".Hum1").text("Humidity: " + response.daily[1].humidity)
                $(".Hum2").text("Humidity: " + response.daily[2].humidity)
                $(".Hum3").text("Humidity: " + response.daily[3].humidity)
                $(".Hum4").text("Humidity: " + response.daily[4].humidity)
                $(".Hum5").text("Humidity: " + response.daily[5].humidity)





                var weatherLogo = $("#weatherLogo");

                var currentWeatherLogo = (response.daily[0].weather[0].icon)  
                console.log(currentWeatherLogo);
                weatherLogo.attr("src", "http://openweathermap.org/img/wn/10d@2x.png");

            });
        });
        var todoList = $("#todo-list");
        var newTodoLi = $("<button>");
        newTodoLi.text(cityInput);
        newTodoLi.addClass("list-group-item list-group-item-action");
        // i need to have it run the search again if I click this button
        // newTodoLi.on("click", myfunc() );

        todoList.append(newTodoLi)
    });


    // store city name in local storage each time search is run; recall the most recent city when necessary
    //dont necessarily have to store in 


})