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

    // Set the initial parameters for website state (sidebar is not collapsed, so new cards should be narrow).
    var sidebarCollapsed = false;
    var narrowOrWide = 'narrow';

    // Collapsing the sidebar.  Doing so means that the current cards need to be made wider to accommodate the extra
    // space, and newly-created cards must start wide.  When toggled back, current and new cards must go back to being
    // narrow.
    $('#toggle').on('click', function () {

      $('#form_content').toggleClass('toggleForm');
      $('#carousel').toggleClass("col-lg-12 col-lg-9 col-xs-12 col-xs-6");
      $('.weather-card').toggleClass('card-narrow card-wide');
      sidebarCollapsed = !sidebarCollapsed;

      if (!sidebarCollapsed) {
        narrowOrWide = 'narrow';
      } else {
        narrowOrWide = 'wide';
      }

    });

    // Initialize the carousel (slick js)
    $('.weather-carousel').slick({
      infinite: false,
      variableWidth: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      dots: true
    });

    // Add a card based on the input boxes.
    // Enoch: This is what you will have to replace.
    $('.add-card-location-button').click(function() {

      var city = $('.inputCity').val();
      var countryCode = $('.inputCountryCode').val();
      var numDays = $('.inputNumDaysForLocation').val();
      var apiKey = '66caf7904e4bf65c8754dc23dd947e5d';

      var leafletID = 0 /* Enoch: set this variable equal to the leaflet id on the map */

      var weatherRequest = new XMLHttpRequest();

      var requestString = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='
                          + city + ',' + countryCode + '&cnt=' + numDays + '&APPID=' + apiKey;

      weatherRequest.open("GET", requestString, true);

      // Replace the onload function of the XMLHttpRequest to parse out the returned JSON data and build a card from it.
      weatherRequest.onload = function (e) {
        if (weatherRequest.readyState === 4) {
          if (weatherRequest.status === 200) {
            var weatherJSON = JSON.parse(weatherRequest.responseText);
            var cityName = weatherJSON.city.name;
            var avgTemperature = Math.round(weatherJSON.list[numDays-1].temp.day-273.15);
            var minTemperature = Math.round(weatherJSON.list[numDays-1].temp.min-273.15);
            var maxTemperature = Math.round(weatherJSON.list[numDays-1].temp.max-273.15);
            var conditionText = weatherJSON.list[numDays-1].weather[0].main;
            var iconCode = weatherJSON.list[numDays-1].weather[0].icon;

            var weatherCard = '<div class="weather-card card-'
              + narrowOrWide +
              '" leaflet-id="'
              + leafletID +
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

            // Add the new card into the carousel and refresh the indicies (makes everything stay clean and orderly)
            $('.weather-carousel').slick('slickAdd', weatherCard);
            $('.weather-carousel').slick('refresh');
          }
        }
      };

      weatherRequest.send(null);

    });

    // Remove a card when the remove button is clicked.
    // Enoch: this is also the button that needs to remove the point from the map.  You should have already stored the
    // leaflet ID in the card via the leafletID variable earlier.
    $(document).on('click', '.weather-card-remove-button', function() {

      var weatherCardIndex = $(this).parent().attr('data-slick-index');
      var weatherCardLeafletID = $(this).parent().attr('leaflet-id');
      console.log(weatherCardIndex);
      console.log(weatherCardLeafletID);
      $('.weather-carousel').slick('slickRemove', weatherCardIndex);
      $('.weather-carousel').slick('refresh');
      // Enoch: Add functionality to remove point here, based on the variable weatherCardLeaftletID

    });

  }

}
