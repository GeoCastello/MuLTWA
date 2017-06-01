import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { CarouselComponent } from '../carousel/carousel.component';
import { WeatherService } from '../shared/weather.service'

import * as L from "leaflet";
import {Map} from "leaflet";

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";


@Component({
  selector: 'app-openlayers',
  templateUrl: './openlayers.component.html',
  styleUrls: ['./openlayers.component.css'],
  providers: [WeatherService]
})

export class OpenlayersComponent implements OnInit {

  public weatherDataTest:any = {name: 'John'};
  public weatherData:any;

  @Output() newData: EventEmitter<any> = new EventEmitter<any>(); // !!
  
  //private weatherData:any;
  private numDays:number=5;
  private REQUEST:string="http://api.openweathermap.org/data/2.5/forecast/daily?lat=";
  private MAP_PROJECTION:string = "EPSG:900913"
  private apiKey:string = "66caf7904e4bf65c8754dc23dd947e5d";
  private map:Map;
  private icon:L.Icon;
  
  constructor(private _weatherRequest: WeatherService) {}

  ngOnInit():void {

    let center = L.latLng(49.00, 8.49);
    this.map = L.map("map",{center:center, zoom:12, zoomControl: false});
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(this.map);
    this.map.on('click', this.getWeatherData, this); 

  }

  /**
   * Method gets weather data from the elevation service
   * @param e Event of clicked point on the map
   */
  private getWeatherData(e) {
              
      let placesIcon = L.icon({iconUrl: 'https://www.iconfinder.com/data/icons/social-media-8/512/pointer.png',
          iconSize:     [38, 38], // size of the icon
          iconAnchor:   [18, 35], // point of the icon which will correspond to marker's location
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      let marker = L.marker(e.latlng, {icon: placesIcon}).addTo(this.map);
      let temp = this._weatherRequest
                      .getRequest(String(e.latlng.lat), String(e.latlng.lng), String(this.numDays))
                      .subscribe(  data => { this.sendWeatherData(data, e); }, err => console.error(err));
  }
  
  /**
   * Process and sends data to the carousel component:
   * @param data Weather Data
   */
  private sendWeatherData(data:any, e:any):void{
      //console.log(e);
      console.log('%cWeather Report of Clicked Point on the Map, Sent to Carousel Component ', 'color:white, background:blue');
      let weatherInfo = JSON.parse(JSON.stringify(data));
      this.weatherData = {weatherInfo: weatherInfo, numDays: this.numDays, leafletID: e.target._leaflet_id};
  }

} // Class