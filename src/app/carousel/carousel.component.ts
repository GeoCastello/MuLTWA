// TODO: Make carousel spin to make newest card visible when adding one past the fifth.

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

    var totalSlides = 0;

    /*$('.weather-carousel').on('afterChange', function() {
      if (totalSlides > 5) {
        $('.weather-carousel').slick('slickGoTo', totalSlides-5);
        $('.weather-carousel').slick('refresh');
      }
    });*/

    // Add card via button
    $('.add-card-coords-button').click(function() {

      var longitude = $('.inputLongitude').val();
      var latitude = $('.inputLatitude').val();
      var numDays = $('.inputNumDaysForCoords').val();
      var apiKey = '66caf7904e4bf65c8754dc23dd947e5d';

      var weatherRequest = new XMLHttpRequest();

      var requestString = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='
                          + latitude + '&lon=' + longitude + '&cnt=' + numDays + '&APPID=' + apiKey;

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
                              '</h6><button class="weather-card-remove-button">Remove</button><table class="weather-card-temperature-table"><tr class="weather-card-temperature-row"><td><h6 class="weather-card-temperature-min-text">Min: '
                              + minTemperature +
                              '°</h6></td><td><h6 class="weather-card-temperature-avg-text">Avg: '
                              + avgTemperature +
                              '°</h6></td><td><h6 class="weather-card-temperature-max-text">Max: '
                              + maxTemperature +
                              '°</h6></td></tr></table></div></div>'

            $('.weather-carousel').slick('slickAdd', weatherCard);
            $('.weather-carousel').slick('refresh');
            totalSlides++;
            console.log('totalSlides = ' + totalSlides);
            if (totalSlides > 5) {
              $('.weather-carousel').slick('slickGoTo', totalSlides-5);
              $('.weather-carousel').slick('refresh');
            }

          }
        }
      };

      weatherRequest.send(null);

    })

    $('.add-card-location-button').click(function() {

      var city = $('.inputCity').val();
      var countryCode = $('.inputCountryCode').val();
      var numDays = $('.inputNumDaysForLocation').val();
      var apiKey = '66caf7904e4bf65c8754dc23dd947e5d';

      var weatherRequest = new XMLHttpRequest();

      var requestString = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='
                          + city + ',' + countryCode + '&cnt=' + numDays + '&APPID=' + apiKey;

      console.log(requestString);

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
              '</h6><button class="weather-card-remove-button">Remove</button><table class="weather-card-temperature-table"><tr class="weather-card-temperature-row"><td class="weather-card-temperature-col"><p class="weather-card-temperature-min-text">Min: '
              + minTemperature +
              '°</p></td><td class="weather-card-temperature-col"><p class="weather-card-temperature-avg-text">Avg: '
              + avgTemperature +
              '°</p></td><td class="weather-card-temperature-col"><p class="weather-card-temperature-max-text">Max: '
              + maxTemperature +
              '°</p></td></tr></table></div></div>'

            $('.weather-carousel').slick('slickAdd', weatherCard);
            $('.weather-carousel').slick('refresh');
            totalSlides++;
            console.log('totalSlides = ' + totalSlides)
            $('.weather-carousel').slick('refresh');
            if (totalSlides > 5) {
              $('.weather-carousel').slick('slickGoTo', totalSlides-5);
            }

          }
        }
      };

      weatherRequest.send(null);

    })

    //Remove card
    $(document).on('click', '.weather-card-remove-button', function() {

      var weatherCardIndex = $(this).parent().attr('data-slick-index');
      $('.weather-carousel').slick('slickRemove', weatherCardIndex)
      $('.weather-carousel').slick('refresh');
      totalSlides--;

    })

  }

}