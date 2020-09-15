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



            // setting todays Date

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

                var forecastTemp3 = parseFloat(response.daily[3].temp.day)
                forecastTemp3 = ((forecastTemp3 - 273.15) * 1.80 + 32).toFixed(2);

                var forecastTemp4 = parseFloat(response.daily[4].temp.day)
                forecastTemp4 = ((forecastTemp4 - 273.15) * 1.80 + 32).toFixed(2);

                var forecastTemp5 = parseFloat(response.daily[5].temp.day)
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




                //Today's date weather logo
                var weatherLogo = $("#weatherLogo");

                var currentWeatherLogo = (response.daily[0].weather[0].icon)  
                console.log(currentWeatherLogo);
                weatherLogo.attr("src", "http://openweathermap.org/img/wn/" + currentWeatherLogo + "@2x.png");

                console.log(response)
                //weather icon for five forecast days

                var weatherLogoDay1 = $("#weatherLogoDay1");
                var currentweatherLogoDay1 = response.daily[1].weather[0].icon;
                console.log(currentweatherLogoDay1);
                weatherLogoDay1.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay1 + "@2x.png" )
                
                var weatherLogoDay2 = $("#weatherLogoDay2");
                var currentweatherLogoDay2 = response.daily[2].weather[0].icon;
                console.log(currentweatherLogoDay2);
                weatherLogoDay2.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay2 + "@2x.png" )


                var weatherLogoDay3 = $("#weatherLogoDay3");
                var currentweatherLogoDay3 = response.daily[3].weather[0].icon;
                console.log(currentweatherLogoDay3);
                weatherLogoDay3.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay3 + "@2x.png" )


                var weatherLogoDay4 = $("#weatherLogoDay4");
                var currentweatherLogoDay4 = response.daily[4].weather[0].icon;
                console.log(currentweatherLogoDay4);
                weatherLogoDay4.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay4 + "@2x.png" )


                var weatherLogoDay5 = $("#weatherLogoDay5");
                var currentweatherLogoDay5 = response.daily[5].weather[0].icon;
                console.log(currentweatherLogoDay5);
                weatherLogoDay5.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay5 + "@2x.png" )

               

            });

        });
        var buttonList = $("#button-list");
        var newCityButton = $("<button>");
        newCityButton.text(cityInput);
        newCityButton.addClass("list-group-item list-group-item-action");
        // i need to have it run the search again if I click this button
        // newCityButton.on("click", myfunc() );

        buttonList.append(newCityButton)
    });


    // store city name in local storage each time search is run; recall the most recent city when necessary
    //dont necessarily have to store in 


})