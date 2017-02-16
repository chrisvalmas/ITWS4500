$(document).ready(function(){
    //Setting variables for ids that I need
    var apiKey = "64d0d5f708fcd85d5cf0115994ff6497"
    var temperature = document.getElementById("temperature");
    var weather = document.getElementById("weatherIcon");
    var location = document.getElementById("location");
    var isCloudy = document.getElementById("isCloudy");
    var wind = document.getElementById("wind");
    var humidity = document.getElementById("humidity");
    var forecastS = document.getElementById("forecastS");
    var Today = new Date();
    //Getting geolocation, have else for when the geolocation cannot be gotten
    function getLocation() {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            alert("Geolocation cannot be found!");
        }
    }
    getLocation();
    
    //This function runs when geolocation is found, basically just has the stats for the weather today
    function showPosition(position) {
        
        $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`, function(data) {
            temperature.innerHTML = "<b>Temperature</b>: " + data.main.temp;
            weather.innerHTML = "<b>Weather</b>: " + data.weather[0].main;
            location.innerHTML = data.name + ",  " + data.sys.country;
            isCloudy.innerHTML = "<b>Clouds</b>: " + data.weather[0].description;
            wind.innerHTML = "<b>Wind Speed</b>: " + data.wind.speed;
            humidity.innerHTML = "<b>Humidity</b>: " + data.main.humidity;
        });
        
        //This one was extremely annoying and contributed to my lab taking a lot longer than it should have
        $.getJSON(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=${7}&appid=${apiKey}&units=imperial`, function(data) {
            var i=0;
            var outputFeed = '<ul id="forecastScroll">';
            for(i;i<7;i++) {
                //SO this was for the forecast, and basically I kept getting an "object undefined" error... which made no sense at first.
                //This was due to the fact that the data.list would randomly change to data.List
                //which would cause an undefined error since the API is horrible
                var test;
                try {
                    test = '<li> <b>Day</b>: ' + (Today.getMonth()+1) + '/' + (Today.getDate()+i+1) + '  <b>Daily Average</b>: ' + data.list[i].temp.day + '  <b>Humidity</b>: ' + data.list[i].humidity + '  <b>Weather</b>:  ' + data.list[i].weather[0].main + '  <b>Clouds</b>:  ' + data.list[i].weather[0].description + '</li>';
                }
                catch (e) {
                    test = '<li> <b>Day</b>: ' + (Today.getMonth()+1) + '/' + (Today.getDate()+i+1) + '  <b>Daily Average</b>: ' + data.List[i].temp.day + '  <b>Humidity</b>: ' + data.List[i].humidity + '  <b>Weather</b>:  ' + data.List[i].weather[0].main + '  <b>Clouds</b>:  ' + data.List[i].weather[0].description + '</li>';
                }
                outputFeed += test;
            }
            //finish outputFeed and then put it in the innerHTML of the table
            outputFeed += "</ul>";
            forecastS.innerHTML = outputFeed;
        });
        
        
    }
    //Just my scroll function with the interval function below, same as twitter tweet lab basically
    function weatherScroll() {
        $('#forecastScroll li:first').slideUp(function() {
            $(this).appendTo($('#forecastScroll')).slideDown();
        });
    }
    
    setInterval(function(){ weatherScroll(); }, 5000);
})