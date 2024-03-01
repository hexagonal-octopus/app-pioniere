$(function() {
   var UI = function() {};
   UI.prototype.fetchWeather = function(el, loc) {
      APPKEY = 'eb829610fb5942949b1acad2c3682773';

      if (el.length > 0) {
         $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather',
            data: {
               q: loc,
               units: 'metric',
               APPID: APPKEY
            },
            success: weather => {
               el.html(`
               <p class="text-light">
               <span class="text-hilite ">${Math.floor(
                  weather.main.temp
               )}</span><sup>o</sup>C</p>
               <p class="text-light">${weather.name} &mdash; ${
                  weather.weather[0].description
               }</p>
               `);
            }
         });
      }
   };

   var ui = new UI();

   // init simpleWeather
   // fetchWeather(element, location, unit)
   setInterval(ui.fetchWeather($('.js-weather'), 'Jakarta'), 600000);
});
