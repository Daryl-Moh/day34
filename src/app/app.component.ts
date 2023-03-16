import { Component, Input, OnInit } from '@angular/core';
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
  
    constructor(private fb: FormBuilder, private weatherSvc: WeatherService) { }
    
    ngOnInit(): void {
      this.form = this.createForm()
    }

    getWeather() {
      const city = this.form.value.city
      console.info('>>> city: ', city)
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
