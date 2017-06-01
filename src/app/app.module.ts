import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OpenlayersComponent } from './openlayers/openlayers.component';
import { FormComponent } from './form/form.component';
import { CarouselComponent } from './carousel/carousel.component';
import { WeatherServiceComponent } from './shared/weather-service/weather-service.component';
import { LocationServiceComponent } from './shared/location-service/location-service.component';

import { RoutingService } from './shared/routing.service'

@NgModule({
  declarations: [
    AppComponent,
    OpenlayersComponent,
    FormComponent,
    CarouselComponent,
    WeatherServiceComponent,
    LocationServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RoutingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
