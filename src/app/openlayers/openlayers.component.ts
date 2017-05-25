import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { WeatherServiceComponent } from '../shared/weather-service/weather-service.component';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

import * as ol from 'openlayers';

@Component({
  selector: 'app-openlayers',
  templateUrl: './openlayers.component.html',
  styleUrls: ['./openlayers.component.css']
})

export class OpenlayersComponent implements OnInit {
  @ViewChild(WeatherServiceComponent) weatherService: WeatherServiceComponent;
  
  //private weatherData:any;
  private lat:number=49.0069; private lng:number=8.4037;private numDays:number=5;
  private REQUEST:string="http://api.openweathermap.org/data/2.5/forecast/daily?lat=";
  private MAP_PROJECTION:string = "EPSG:900913"
  private apiKey:string = "66caf7904e4bf65c8754dc23dd947e5d";
  private http:Http;
  private weatherData:JSON;
  private userCoords:any;
  private map:ol.Map;
  
  
    constructor(http: Http) {
        this.http = http;
    }

  ngOnInit():void {

    // Warm up the weather service for action ;), for some reason it only responds after first trial ;)
    this.weatherService.getData(String(49.00), String(8.50), String(5));

    this.map = new ol.Map({
        controls: ol.control.defaults({
			  attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
				collapsible: false})
        }).extend([
			new ol.control.ZoomToExtent({
				extent: [
					813079.7791264898, 5929220.284081122,
					848966.9639063801, 5936863.986909639
				]
			})
        ]),
        layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
        ],
        target: 'map',
        view: new ol.View({
        	projection: this.MAP_PROJECTION,
			center: [	934627.7737138773, 6268581.861806088],
			zoom: 5
        })
	  });

    // Events captured
    this.map.on('click', this.getWeatherData, this); 

  }

  public getWeatherData(e){
      this.userCoords = ol.proj.transform(e.coordinate, this.MAP_PROJECTION, 'EPSG:4326');
      this.weatherData = this.weatherService.getData(String(this.userCoords[1]), String(this.userCoords[0]), String(this.numDays));
      console.log('Weather Report of Clicked Point on the Map '); console.log(this.weatherData)
  }

}
