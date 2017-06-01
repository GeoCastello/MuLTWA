import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-location-service',
  templateUrl: './location-service.component.html',
  styleUrls: ['./location-service.component.css']
})



export class LocationServiceComponent  {

  constructor(protected _http: Http) { }
  public locationAdd = [];

  public getLocation():Array<number>
  {
    console.log('Current User Location');
          this._http
           .get("http://ipv4.myexternalip.com/json")
           .map(res => res.json().ip)
           .mergeMap(ip => this._http.get("http://freegeoip.net/json/" + ip))
           .map((res: Response) => res.json())
           .subscribe(result => {
             this.locationAdd [0] =  result.city;
             this.locationAdd [1] =  result.latitude;
             this.locationAdd [2] =  result.longitude;
             //console.log(this.locationAdd);
             //console.log(result);
             
           },
           (rej) => {console.error("Could not load data",rej)});
        
           return this.locationAdd;

  }

}
