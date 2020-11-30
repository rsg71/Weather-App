$(document).ready(function () {
    // // This is the first API key
    var APIKey = "03de5e028a39ba0da41025c49291b0de";

    var cityName = $("#city-name");
    var temperature = $("#temperature");
    var humidity = $("#humidity");
    var wind = $("#wind");
    var UVspan = $("#UVspan");


    // forecasted dates//
    var forecastDay1 = $("#DayAhead1");
    var futureDayOne = moment().add(1, 'days').calendar();
    forecastDay1.text(futureDayOne);

    var forecastDay2 = $("#DayAhead2");
    var futureDayTwo = moment().add(2, 'days').calendar();
    forecastDay2.text(futureDayTwo);

    var forecastDay3 = $("#DayAhead3");
    var futureDayThree = moment().add(3, 'days').calendar();
    forecastDay3.text(futureDayThree);

    var forecastDay4 = $("#DayAhead4");
    var futureDayFour = moment().add(4, 'days').calendar();
    forecastDay4.text(futureDayFour);

    var forecastDay4 = $("#DayAhead5");
    var futureDayFive = moment().add(5, 'days').calendar();
    forecastDay4.text(futureDayFive);



    //creating search button and subsequent functions once clicked: 
    renderWeatherData();


    

    
    $("#city-input").on('keyup', function (e) {
        e.preventDefault();
        if (e.key === 'Enter' || e.keyCode === 13) {
            var cityInput = $("#city-input").val();
            if (!cityInput) {
                alert('Please enter a city')
                return;
            }
            localStorage.setItem("city-input", cityInput)

            var buttonList = $("#button-list");
            var newCityButton = $("<button>");
            newCityButton.html(cityInput);
            
            newCityButton.attr("data", cityInput);
            newCityButton.addClass("list-group-item list-group-item-action");
            buttonList.prepend(newCityButton);
            
            console.log("search button clicked");
    

            $("#city-input").val('')
        }
       
        renderWeatherData();
    });

    $("#search-button").on("click", function (event) {
        event.preventDefault();
        

        var cityInput = $("#city-input").val();

        if (!cityInput) {
            alert('Please enter a city')
            return;
        }

        localStorage.setItem("city-input", cityInput)


        var buttonList = $("#button-list");
        var newCityButton = $("<button>");
        newCityButton.html(cityInput);
        
        newCityButton.attr("data", cityInput);
        newCityButton.addClass("list-group-item list-group-item-action");
        buttonList.prepend(newCityButton);
        
        console.log("search button clicked");

        renderWeatherData();

        $("#city-input").val('')

    });

    
    $(document).on("click", ".list-group-item", function() {
        console.log("new city button clicked");
        console.log($(this));
        var cityDataName = $(this).attr("data");
        console.log(cityDataName);

        localStorage.setItem("city-input", cityDataName);
        renderWeatherData();
    })


    function renderWeatherData() {
        //make the ajax call it's own function


        cityInput = localStorage.getItem("city-input");

        // setting the API key based on search terms
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

            localStorage.setItem("humidity", humidityEl);
            localStorage.setItem("wind", windEl)



            // lat an lon from first call: 
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // -------------now I am finding the UV index and getting the 5 day forecast ----------------------------------

            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // console.log(response);

                // forecasted UV index
                var UVEl = parseFloat(response.current.uvi).toFixed(2);
                UVspan.text(UVEl);

                localStorage.setItem("UV", UVEl);

                if (UVEl > 7) {
                    UVspan.attr("class", "btn-danger");
                }
                else if (UVEl > 3) {
                    UVspan.attr("class", "btn-warning");
                }
                else {
                    UVspan.attr("class", "btn-success")
                }


                // forecasted temperatures
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


                // forecasted humidity
                $(".Hum1").text("Humidity: " + response.daily[1].humidity + "%");
                $(".Hum2").text("Humidity: " + response.daily[2].humidity + "%");
                $(".Hum3").text("Humidity: " + response.daily[3].humidity + "%");
                $(".Hum4").text("Humidity: " + response.daily[4].humidity + "%");
                $(".Hum5").text("Humidity: " + response.daily[5].humidity + "%");


                //Today's date weather logo
                var weatherLogo = $("#weatherLogo");

                var currentWeatherLogo = (response.daily[0].weather[0].icon)
                // console.log(currentWeatherLogo);
                weatherLogo.attr("src", "http://openweathermap.org/img/wn/" + currentWeatherLogo + "@2x.png");


                //forecasted weather icons
                var weatherLogoDay1 = $("#weatherLogoDay1");
                var currentweatherLogoDay1 = response.daily[1].weather[0].icon;
                // console.log(currentweatherLogoDay1);
                weatherLogoDay1.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay1 + "@2x.png")

                var weatherLogoDay2 = $("#weatherLogoDay2");
                var currentweatherLogoDay2 = response.daily[2].weather[0].icon;
                // console.log(currentweatherLogoDay2);
                weatherLogoDay2.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay2 + "@2x.png")


                var weatherLogoDay3 = $("#weatherLogoDay3");
                var currentweatherLogoDay3 = response.daily[3].weather[0].icon;
                // console.log(currentweatherLogoDay3);
                weatherLogoDay3.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay3 + "@2x.png")


                var weatherLogoDay4 = $("#weatherLogoDay4");
                var currentweatherLogoDay4 = response.daily[4].weather[0].icon;
                // console.log(currentweatherLogoDay4);
                weatherLogoDay4.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay4 + "@2x.png")


                var weatherLogoDay5 = $("#weatherLogoDay5");
                var currentweatherLogoDay5 = response.daily[5].weather[0].icon;
                // console.log(currentweatherLogoDay5);
                weatherLogoDay5.attr("src", "http://openweathermap.org/img/wn/" + currentweatherLogoDay5 + "@2x.png")
            });
        });
    }
})