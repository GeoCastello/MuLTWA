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

    var sidebarCollapsed = false;
    var narrowOrWide = 'narrow';

    $('#toggle').on('click', function () {
      $('#form_content').toggleClass('toggleForm');
      $('#carousel').toggleClass("col-lg-12 col-lg-9 col-xs-12 col-xs-6");
      $('.weather-card').toggleClass('card-narrow card-wide');
      sidebarCollapsed = !sidebarCollapsed;
    });

    // Initialize carousel
    $('.weather-carousel').slick({
      infinite: false,
      variableWidth: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      dots: true
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

            // Card must be made narrow if the sidebar is not collapsed, wide if it is.
            if (!sidebarCollapsed) {
              narrowOrWide = 'narrow';
            } else {
              narrowOrWide = 'wide';
            }

            var weatherCard = '<div class="weather-card card-'
              + narrowOrWide +
              '"><h3 class="weather-card-city-name"><b>'
              + cityName +
              '</b></h3><h5 class="weather-card-city-date">'
              + (numDays-1) +
              '</h5><img src="http://openweathermap.org/img/w/'
              + iconCode +
              '.png" class="weather-card-conditions-img"><h6 class="weather-card-conditions-text">'
              + conditionText +
              '</h6><button class="weather-card-remove-button">Remove</button><table class="weather-card-temperature-table"><tr class="weather-card-temperature-row"><td class="weather-card-temperature-col"><h6 class="weather-card-temperature-min-text">Min: '
              + minTemperature +
              '°</h6></td class="weather-card-temperature-col"><td class="weather-card-temperature-col"><h6 class="weather-card-temperature-avg-text">Avg: '
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

    });

    $('.add-card-location-button').click(function() {

      var city = $('.inputCity').val();
      var countryCode = $('.inputCountryCode').val();
      var numDays = $('.inputNumDaysForLocation').val();
      var apiKey = '66caf7904e4bf65c8754dc23dd947e5d';

      var weatherRequest = new XMLHttpRequest();

      var requestString = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='
                          + city + ',' + countryCode + '&cnt=' + numDays + '&APPID=' + apiKey;

      weatherRequest.open("GET", requestString, true);

      weatherRequest.onload = function (e) {
        if (weatherRequest.readyState === 4) {
          if (weatherRequest.status === 200) {
            var weatherJSON = JSON.parse(weatherRequest.responseText);
            console.log(weatherJSON);
            var cityName = weatherJSON.city.name;
            var avgTemperature = Math.round(weatherJSON.list[numDays-1].temp.day-273.15);
            var minTemperature = Math.round(weatherJSON.list[numDays-1].temp.min-273.15);
            var maxTemperature = Math.round(weatherJSON.list[numDays-1].temp.max-273.15);
            var conditionText = weatherJSON.list[numDays-1].weather[0].main;
            var iconCode = weatherJSON.list[numDays-1].weather[0].icon;

            if (!sidebarCollapsed) {
              narrowOrWide = 'narrow';
            } else {
              narrowOrWide = 'wide';
            }

            var weatherCard = '<div class="weather-card card-'
              + narrowOrWide +
              '"><h3 class="weather-card-city-name"><b>'
              + cityName +
              '</b></h3><h5 class="weather-card-city-date">'
              + (numDays-1) +
              '</h5><img src="http://openweathermap.org/img/w/'
              + iconCode +
              '.png" class="weather-card-conditions-img"><h6 class="weather-card-conditions-text">'
              + conditionText +
              '</h6><button class="weather-card-remove-button">Remove</button><table class="weather-card-temperature-table"><tr class="weather-card-temperature-row"><td class="weather-card-temperature-col"><h6 class="weather-card-temperature-min-text">Min: '
              + minTemperature +
              '°</h6></td class="weather-card-temperature-col"><td class="weather-card-temperature-col"><h6 class="weather-card-temperature-avg-text">Avg: '
              + avgTemperature +
              '°</h6></td><td><h6 class="weather-card-temperature-max-text">Max: '
              + maxTemperature +
              '°</h6></td></tr></table></div></div>'

            $('.weather-carousel').slick('slickAdd', weatherCard);
            $('.weather-carousel').slick('refresh');
            totalSlides++;
            console.log('totalSlides = ' + totalSlides)
            $('.weather-carousel').slick('refresh');
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
