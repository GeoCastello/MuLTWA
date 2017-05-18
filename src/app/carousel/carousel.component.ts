import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('.weather-carousel').slick({
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 1
    });

  }

}
