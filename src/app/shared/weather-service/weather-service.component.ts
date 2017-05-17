import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-weather-service',
  templateUrl: './weather-service.component.html',
  styleUrls: ['./weather-service.component.css']
})
export class WeatherServiceComponent implements OnInit {
  
  @Input()  private location = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
