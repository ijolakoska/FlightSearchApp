import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchFlight } from '../shared/models/search';
import { Flight } from '../shared/models/flight';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class FlightService {

  private testData: Flight[] = [
    {
      airline: "USAir",
      origin: "LAS",
      destination: "LAX",
      depdate: "2018-12-17t1835",
      arrdate: "2018-12-18t1835",
      fulldepdate: new Date("2018-12-17"),
      fullarrdate: new Date("2018-12-18"),
      operatingcarrier: "AZ",
      flightno: 887,
      fullflightNo: "AZ887",
      stops: 1
    },
    {
      airline: "USAir",
      origin: "LAS",
      destination: "LAX",
      depdate: "2018-12-17t1835",
      arrdate: "2018-12-18t1835",
      fulldepdate: new Date("2018-12-17"),
      fullarrdate: new Date("2018-12-18"),
      operatingcarrier: "AZ",
      flightno: 887,
      fullflightNo: "AZ887",
      stops: 1
    }
  ];

  constructor(private http: HttpClient) { }

  public GetFlights(search: SearchFlight): Observable<Array<Flight>> {    
    
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Array<Flight>>('http://localhost:8080/api/flights', search, httpOptions);    
  }

  public GetFlightsTestData(search: SearchFlight): Flight[] {

    return this.testData;
  }  
}
