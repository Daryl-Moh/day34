import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../weatherservice';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  
    weather$!: Observable<Weather[]>
    weather: Weather[] = []
    weatherSub!: Subscription

    constructor(private weatherSvc: WeatherService) { }

    ngOnInit(): void {
      console.info('subscribing to weather')
      // subscribe returns a subscription
      this.weatherSub = this.weatherSvc.onWeather.subscribe(
        (data) => this.weather = data
      )
      //this.weather$ = this.weatherSvc.onWeather.asObservable()
    }

    ngOnDestroy(): void {
        // very important for multipage 
        this.weatherSub.unsubscribe()
    }
}
