import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OpenlayersComponent } from '../openlayers/openlayers.component';
import * as $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick';

import { RoutingService } from '../shared/routing.service'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [RoutingService]
})
export class CarouselComponent implements OnChanges {

@Input() private weatherJSON:any;

  clicks = 0;

  constructor() { 

  }

  ngOnChanges() {
    if (this.weatherJSON) { this.createCard() }
  }

  createCard() {
    console.log('Data came here ' + this.clicks++);
    console.log(this.weatherJSON);
    



  }



}