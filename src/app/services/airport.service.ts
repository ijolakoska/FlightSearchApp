import { Injectable } from '@angular/core';
import { Airport } from '../shared/models/airport';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private testData = new Array<Airport>();
  constructor() { 

    this.testData = [
      {
        code: "LAX",
        name: "Los Angeles",
        displayedName: "LAX - Los Angeles",
        city: "Los Angeles"
      },
      {
        code: "LAS",
        name: "Las Vegas",
        displayedName: "LAS - Las Vegas",
        city: "Las Vegas"
      },
      {
        code: "JFK",
        name: "New York Kennedy",
        displayedName: "JFK - New York Kennedy",
        city: "New York"
      },
      {
        code: "SKP",
        name: "Skopje Airport",
        displayedName: "SKP - Skopje Airport",
        city: "Skopje"
      }
    ];
  }
  
  public GetAirports(): string[] {
    //the service returns a static values for airports just for test purposes, 
    //should call a real API instead and keep the data structure
    return this.testData.map((item) => item.displayedName);
  }

  public GetAirportCity(airportCode: string): string {
    var index = this.testData.findIndex((item) => item.code.toLowerCase() == airportCode.trim().toLowerCase());
    return this.testData[index].city;
  }
}
