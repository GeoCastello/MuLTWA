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

      console.log('longtidue: ' + longitude)
      console.log('latidue: ' + latitude)
      console.log('numDays: ' + numDays)
      console.log('apiKey: ' + apiKey)

      var weatherRequest = new XMLHttpRequest();

      var requestString = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude +
                          "&cnt=" + numDays + "&APPID=" + apiKey;

      weatherRequest.open("GET", requestString, true);

      weatherRequest.onload = function (e) {
        if (weatherRequest.readyState === 4) {
          if (weatherRequest.status === 200) {
            var myJSON = JSON.parse(weatherRequest.responseText);
            var cityName = myJSON.city.name;
            var avgTemperature = myJSON.list[numDays-1].temp.day-273.15;
            var minTemperature = myJSON.list[numDays-1].temp.min-273.15;
            var maxTemperature = myJSON.list[numDays-1].temp.max-273.15;
            var conditionCode = myJSON.list[numDays-1].weather[0].id;
            var iconCode = myJSON.list[numDays-1].weather[0].icon;

            $('.weather-carousel').slick('slickAdd',
              '<div class="weather-card"><h3 class="weather-card-city-name"><b>'
              + cityName +
              '</b></h3><h5 class="weather-card-city-date">'
              + (numDays-1) +
              '</h5><img src="http://openweathermap.org/img/w/'
              + iconCode +
              '.png" class="weather-card-conditions-img"><h6 class="weather-card-conditions-text">'
              + conditionCode +
              '</h6><table class="weather-card-temperature-table"><tr class="weather-card-temperature-row"><td><h6 class="weather-card-temperature-min-text">Min: '
              + minTemperature +
              '°</h6></td><td><h6 class="weather-card-temperature-avg-text">Avg: '
              + avgTemperature +
              '°</h6></td><td><h6 class="weather-card-temperature-max-text">Max: '
              + maxTemperature +
              '°</h6></td></tr></table></div></div>')

          }
        }
      };

      weatherRequest.send(null);

    })

  }

}
