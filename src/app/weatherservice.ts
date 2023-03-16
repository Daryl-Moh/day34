import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, firstValueFrom, Subject, Observable, tap } from "rxjs";
import { Weather } from "./models";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ec9072624f99c20d4bf8c41c4a168c49

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"
const APPID = "<API KEY>"

@Injectable()
export class WeatherService {

    onWeather = new Subject<Weather[]>

    constructor(private http: HttpClient) { }

    getWeatherAsObservable(city: string): Observable<Weather[]> {
        const params = new HttpParams()
            .set('q', city)
            .set('units', 'metric')
            .set('appid', APPID)

        return this.http.get<Weather[]>(WEATHER_URL, { params })
            .pipe(
                // map((data:any) => {
                //     return data['weather >>>'] as Weather[]
                // }),
                // tap(data => {
                //     console.info('data >>> ', data)
                //     this.onWeather.next(data)
                // })
        )
    }

    getWeather(city: string): Promise<Weather[]> {

        return firstValueFrom(
            this.getWeatherAsObservable(city)
        )
        .then((data: any) => {
            // map() and tap()
            const w = data['weather'] as Weather[]
            // this.onWeather.next(w)
            return w
        })
        .then(data => {
            this.onWeather.next(data)
            return data
        })
    }   
       
}
