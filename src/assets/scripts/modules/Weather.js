import $ from 'jquery';
import '../../scripts/simpleweather/jquery.simpleWeather';

class Weather{
   constructor(el, loc, unit) {
      this.element = el;
      this.location = loc;
      this.unit = unit;

      this.fetchWeather();
   }

   fetchWeather() {
      const weatherFunc = this.getWeather();
      setInterval(weatherFunc, 600000);
   }


   getWeather() {
      if(this.element.length > 0) {
         $.simpleWeather({
            location: this.location,
            unit: this.unit,
            success: (weather) => {
               this.element.html(`
               <p class="text-light"><span class="text-hilite ">${weather.temp}</span><sup>o</sup>${weather.units.temp}</p>
               <p class="text-light">${weather.city} &mdash; ${weather.currently}</p>
               `);
            },
            error: (error) => {
               this.element.html(error);
            }
         });
      }
   }
}

export default Weather;