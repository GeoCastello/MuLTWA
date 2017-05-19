import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Initialize carousel
    $('.weather-carousel').slick({
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 1
    });

    // Add card via button
    $('.add-card-button').click(function() {

      var longitude = $('.inputLongitude').val();
      var latitude = $('.inputLatitude').val();
      var numDays = $('.inputNumDays').val();
      var apiKey = "66caf7904e4bf65c8754dc23dd947e5d";

      var weatherRequest = new XMLHttpRequest();

      var requestString = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude +
                          "&cnt=" + numDays + "&APPID=" + apiKey;

      weatherRequest.open("GET", requestString, true);

      weatherRequest.onload = function (e) {
        if (weatherRequest.readyState === 4) {
          if (weatherRequest.status === 200) {
            var myJSON = JSON.parse(weatherRequest.responseText);
            console.log(myJSON);
            var cityName = myJSON.city.name;
            var avgTemperature = Math.round(myJSON.list[numDays-1].temp.day-273.15);
            var minTemperature = Math.round(myJSON.list[numDays-1].temp.min-273.15);
            var maxTemperature = Math.round(myJSON.list[numDays-1].temp.max-273.15);
            var conditionText = myJSON.list[numDays-1].weather[0].main;
            var iconCode = myJSON.list[numDays-1].weather[0].icon;

            var weatherCard = '<div class="weather-card"><h3 class="weather-card-city-name"><b>'
                              + cityName +
                              '</b></h3><h5 class="weather-card-city-date">'
                              + (numDays-1) +
                              '</h5><img src="http://openweathermap.org/img/w/'
                              + iconCode +
                              '.png" class="weather-card-conditions-img"><h6 class="weather-card-conditions-text">'
                              + conditionText +
                              '</h6><table class="weather-card-temperature-table"><tr class="weather-card-temperature-row"><td><h6 class="weather-card-temperature-min-text">Min: '
                              + minTemperature +
                              '°</h6></td><td><h6 class="weather-card-temperature-avg-text">Avg: '
                              + avgTemperature +
                              '°</h6></td><td><h6 class="weather-card-temperature-max-text">Max: '
                              + maxTemperature +
                              '°</h6></td></tr></table></div></div>'

            $('.weather-carousel').slick('slickAdd', weatherCard);
            updateWeatherCardCSS();

          }
        }
      };

      weatherRequest.send(null);

      function updateWeatherCardCSS() {
        $('.weather-card').css('margin', '15px');
        $('.weather-card').css('background-color', 'white');
        $('.weather-card').css('border-style', 'solid');
        $('.weather-card').css('border-width', '1px');
        $('.weather-card').css('border-color', 'black');
        $('.weather-card-city-name').css('text-align', 'center');
        $('.weather-card-city-date').css('text-align', 'center');
        $('.weather-card-conditions-img').css('height', '100px');
        $('.weather-card-conditions-img').css('width', '100px');
        $('.weather-card-conditions-img').css('display', 'block');
        $('.weather-card-conditions-img').css('margin', 'auto');
        $('.weather-card-conditions-text').css('text-align', 'center');
        $('.weather-card-temperature-table').css('width', '100%');
        $('.weather-card-temperature-row').css('width', '100%');
        $('.weather-card-temperature-min-text').css('margin', '5px');
        $('.weather-card-temperature-min-text').css('text-align', 'left');
        $('.weather-card-temperature-avg-text').css('margin', '5px');
        $('.weather-card-temperature-avg-text').css('text-align', 'center');
        $('.weather-card-temperature-max-text').css('margin', '5px');
        $('.weather-card-temperature-max-text').css('text-align', 'right');
      };

    })

  }

}
