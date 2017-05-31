import { Component, Input, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class WeatherService {
  public REQUEST:string="http://api.openweathermap.org/data/2.5/forecast/daily?lat=";
  public apiKey:string = "66caf7904e4bf65c8754dc23dd947e5d";
  http: Http;
  constructor(http: Http) {
      this.http = http;
  }
  getRequest (lat:string, lng:string, numDays:string) {
    return this.http.get(this.REQUEST + lat +"&lon=" + lng + "&cnt=" + numDays + "&APPID=" + this.apiKey)
    .map(response => response.json())
  } 

}