$(document).ready( function() {

var formPlaces = places({
container: document.querySelector('#place'),
type: 'city',
aroundLatLngViaIP: false,
templates: {
    value: function(suggestion) {
    return suggestion.name;
    }
}
});

formPlaces.on('change', e => switchParameters(e));

function switchParameters(e) {
    //console.log(e);
    window.formLat = e.suggestion.latlng.lat;
    window.formLng = e.suggestion.latlng.lng;
}    
    
$.datetimepicker.setDateFormatter({
    parseDate: function (date, format) {
        var d = moment(date, format);
        return d.isValid() ? d.toDate() : false;
    },
    
    formatDate: function (date, format) {
        return moment(date).format(format);
    }
});
    
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
var map = L.map('map').setView([48.115323, 13.836266], 5).addLayer(osm);
    
//POPUP
popup = L.popup();

popupcontent = $('<div><input id="datetimepicker" type="text" placeholder="Double click me"/><button id="sendDate">GO!</button></div>').click(function() {
jQuery('#datetimepicker').datetimepicker({
  format:'YYYY-MM-DD',
  formatTime:'h:mm a',
  formatDate:'YYYY-MM-DD'
});
})[0];

map.on('click', onMapClick);

var markerGroup = L.featureGroup().addTo(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(popupcontent)
        .openOn(map);

    // get location & ids from map click
    latitude = e.latlng.lat
    longitude = e.latlng.lng;
}

$(document).on('click', '#sendDate', function() {
    diffDays=999;
    today = new Date();
    forecastDate = new Date(Date.parse(document.getElementById('datetimepicker').value));
    timeDiff = Math.abs(forecastDate.getTime() - today.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    dayWrapper = moment(forecastDate);

    if (diffDays<=14){
             // add marker to map & associated weather card in carousel
        makeWeatherCard(latitude, longitude, diffDays);
        map.closePopup();
    }
    else {
        alert("Forecast maximum is 14 Days.")
    }
       
    
    document.getElementById('datetimepicker').value="";
    document.getElementById('datetimepicker').placeholder="Click me!";
});
    
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
    
function makeWeatherCard(lat, lon, numDays) {

    //var numDays = 2; // this needs to be an input that is the difference between system date & input date (from calendar)

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
                marker.bindTooltip(String.fromCharCode(13) + dayWrapper.format("DD.MM.YYYY"), {
                    className: 'mapTooltip'
                });
                var leafletID = marker._leaflet_id;
                markerGroup.addLayer(marker);

                // weather card HTML
                var weatherCard = '<div class="weather-card card-narrow" leafletid="'
                    + leafletID +
                    '"><h3 class="weather-card-city-name"><b>'
                    + cityName +
                    '</b></h3><h5 class="weather-card-city-date">'
                    + (dayWrapper.format("DD.MM.YYYY")) +
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

// ************************************ FORM *********************************
// CALENDAR
    
jQuery('#calendar').datetimepicker({
  format:'YYYY-MM-DD',
  formatTime:'h:mm a',
  formatDate:'YYYY-MM-DD'
});
    
    
function geocoderParse() {
             
                lat= window.formLat;
                lon= window.formLng;
                 
                diffDays=999;
                today = new Date();
                forecastDate = new Date(Date.parse(document.getElementById('calendar').value));
                timeDiff = Math.abs(forecastDate.getTime() - today.getTime());
                diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                dayWrapper = moment(forecastDate);

                if (diffDays<=14){
                         // add marker to map & associated weather card in carousel
                    makeWeatherCard(lat, lon, diffDays);
                    map.closePopup();
                }
                else {
                    alert("Forecast maximum is 14 Days.")
                }


                document.getElementById('calendar').value="";
                document.getElementById('calendar').placeholder="Click me!";

    };

    $("#calendar").change(function() {
        $("#calendar").datetimepicker( "hide" );
    });

    $(document).on("change", "#datetimepicker", function() {
        $("#datetimepicker").datetimepicker( "hide" );
    });

    $("#sendLocation").click(function() {
        geocoderParse();

    });
    
    
    
    //******************************* NAV MENU ************************
    $(".nav li").on("click", function() {
        $(".nav li").removeClass("active");
        $(this).addClass("active");  
    });
    
    $(".nav li a#teamBttn").on("click", function() {
            $("#help").hide();
            $("#about").hide();
            $("#team").toggle();
        });

    
    $(".nav li a#aboutBttn").on("click", function() {
            $("#team").hide();
            $("#help").hide();
            $("#about").toggle();
        });
});