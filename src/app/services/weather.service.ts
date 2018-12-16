import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherCondition } from './../shared/models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public GetForecast(city: string, date: Date): Observable<WeatherCondition> {    
    
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    var results = this.http.get<WeatherCondition>(`http://localhost:8080/api/weather?city=${city}&date=${date}`, httpOptions);

    return results;
  }
}
