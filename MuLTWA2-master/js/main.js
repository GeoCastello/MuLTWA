$(document).ready( function() {

// =============================
// ========== LEAFLET ==========
// =============================

var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
osm = L.tileLayer(osmUrl, {
    maxZoom: 18,
    attribution: osmAttrib
});

// initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([19.04469, 72.9258], 12).addLayer(osm);

map.on('click', onMapClick);

var markerGroup = L.layerGroup().addTo(map);

function onMapClick(e) {

    // get location & ids from map click
    var latitude = e.latlng.lat
    var longitude = e.latlng.lng;
    

    // add marker to map & associated weather card in carousel
    makeWeatherCard(latitude, longitude);
}

// =============================
// ========== CAROUSEL =========
// =============================

// initialize carousel
$('.weather-carousel').slick({
    infinite: false,
    variableWidth: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true
});

function makeWeatherCard(lat, lon) {

    var numDays = 2; // this needs to be an input that is the difference between system date & input date (from calendar)

    // prepare API call
    var apiKey = '66caf7904e4bf65c8754dc23dd947e5d';
    var weatherRequest = new XMLHttpRequest();
    var requestString = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='
                       + lat + '&lon=' + lon + '&cnt=' + numDays + '&APPID=' + apiKey;
    weatherRequest.open("GET", requestString, true);

    // replace onload function of the weather request with the logic to build a new weather card using data
    // from the response & also the leaflet ID of the associated marker.
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


                markerIcon = L.icon({iconUrl: 'http://openweathermap.org/img/w/' + iconCode + ".png", iconAnchor: [25,25]});
                var marker = L.marker([lat,lon], { icon: markerIcon }).addTo(markerGroup);
                var leafletID = marker._leaflet_id;
                markerGroup.addLayer(marker);

                // weather card HTML
                var weatherCard = '<div class="weather-card card-narrow" leafletid="'
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

                // add new weather card to carousel
                $('.weather-carousel').slick('slickAdd', weatherCard);
            }
        }
    };

    // send request to weather service
    weatherRequest.send(null);

}

//Remove card
$(document).on('click', '.weather-card-remove-button', function() {

    // get leaflet id from card (should be the same as its marker) & remove the marker
    var weatherCardLeafletID = $(this).parent().attr('leafletid');
    markerGroup.removeLayer(weatherCardLeafletID);

    // get this card's data-slick-id & remove it.
    var weatherCardIndex = $(this).parent().attr('data-slick-index');
    $('.weather-carousel').slick('slickRemove', weatherCardIndex)
    $('.weather-carousel').slick('refresh');

})

});