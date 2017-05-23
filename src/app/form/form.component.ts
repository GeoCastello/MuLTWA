import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationServiceComponent } from '../shared/location-service/location-service.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
   
  @ViewChild(LocationServiceComponent) locationService: LocationServiceComponent;
  public userLocation = [];
  public locationCondition = [];

  constructor() { }

  ngOnInit() {
    this.userLocation = this.locationService.getLocation();
    console.log(this.userLocation);
  }
}
