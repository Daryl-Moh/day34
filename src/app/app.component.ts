import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Weather } from './models';
import { WeatherService } from './weatherservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    form!: FormGroup
    weather: Weather[] = []
    weather$!: Observable<Weather[]>

    cityName!: string
  
    constructor(private fb: FormBuilder, private weatherSvc: WeatherService) { }
    
    ngOnInit(): void {
      this.form = this.createForm()
    }

    getWeather() {
      const city = this.form.value.city
      this.cityName=city
      console.info('>>> city: ', city, this.cityName)
      // // When not using observables
      // this.weatherSvc.getWeather(city)
      //   .then(result => {
      //     this.weather = result
      //     console.info('weather: ', this.weather)
      //     this.form.reset()
      //   })

      //this.weather$ = this.weatherSvc.getWeatherAsObservable(city)
      this.weatherSvc.getWeather(city)

    }

    private createForm(): FormGroup {
      return this.fb.group({
        city: this.fb.control('', [Validators.required])
    })
  }
}
