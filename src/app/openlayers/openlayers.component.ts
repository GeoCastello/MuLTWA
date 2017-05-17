import { Component, OnInit, Input } from '@angular/core';
import { WeatherServiceComponent } from '../shared/weather-service/weather-service.component';

@Component({
  selector: 'app-openlayers',
  templateUrl: './openlayers.component.html',
  styleUrls: ['./openlayers.component.css']
})

export class OpenlayersComponent implements OnInit {

  @Input()  private weatherData = [];
  
  constructor(
    //private weather: WeatherServiceComponent
    ) { }

  ngOnInit() {
  }

}
