import { Component, Input, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";



@Component({
  selector: 'app-weather-service',
  templateUrl: './weather-service.component.html',
  styleUrls: ['./weather-service.component.css']
})
export class WeatherServiceComponent {
  public response:JSON;
  http: Http;
  public REQUEST:string="http://api.openweathermap.org/data/2.5/forecast/daily?lat=";
  public apiKey:string = "66caf7904e4bf65c8754dc23dd947e5d";

    constructor(http: Http) {
        this.http = http;
    }

  public getData (lat:string, lng:string, numDays:string):JSON {

      this.http.get(this.REQUEST + lat +"&lon=" + lng + "&cnt=" + numDays + "&APPID=" + this.apiKey)
      .map(res=> res.json())
      .subscribe(results => {
      this.response = results;

      //console.log(results);
     
      }, (rej) => {console.error("Could not load data",rej)});

      return this.response;
     
  }

}
