import { Component, OnInit, ViewChild, Output, EventEmitter, Renderer } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

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

@Output() newData: EventEmitter<any> = new EventEmitter<any>();
  
  //private weatherData:any;
  private numDays:number=5;
  private REQUEST:string="http://api.openweathermap.org/data/2.5/forecast/daily?lat=";
  private MAP_PROJECTION:string = "EPSG:900913"
  private apiKey:string = "66caf7904e4bf65c8754dc23dd947e5d";
  private http:Http;
  private weatherData;
  private userCoords:any;
  
  private map:Map;
  
  private icon;
  
    constructor(http: Http, private _weatherRequest: WeatherService) {
        this.http = http;
    }

  ngOnInit():void {
    
    this.map = L.map("map",
        {center:[49.00, 8.49], 
        zoom:12, 
        zoomControl: false
        });
    
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(this.map);
      
    
    // Events captured
    this.map.on('click', this.getWeatherData, this); 
    

  }


  public getWeatherData(e){
            
            let greenIcon = L.icon({
                iconUrl: 'https://www.iconfinder.com/data/icons/social-media-8/512/pointer.png',

                iconSize:     [38, 38], // size of the icon
                iconAnchor:   [18, 35], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            
            
            let marker = L.marker(e.latlng, {icon: greenIcon}).addTo(this.map);
  
            let temp = this._weatherRequest
                            .getRequest(String(e.latlng.lat), String(e.latlng.lng), String(this.numDays))
                            .subscribe(  data => { this.sendWeatherData(data); },
                                                                        err => console.error(err));
      

  }
  
private sendWeatherData(data:any){
    console.log('Weather Report of Clicked Point on the Map '); console.log(data);
    this.weatherData = JSON.parse(JSON.stringify(data));
    this.newData.emit(this.weatherData);
  }

}
