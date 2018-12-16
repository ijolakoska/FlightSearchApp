import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AirportService } from './../services/airport.service';
import { FlightService } from '../services/flight.service';
import { WeatherService } from '../services/weather.service';
import { Flight } from '../shared/models/flight';
import { WeatherCondition } from '../shared/models/weather';
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchForm: FormGroup;
  public selectedFlight: Flight;
  public weather: WeatherCondition;
  public submitted: boolean;
  public success: boolean;

  public options: string[];
  public sourceOptions: Observable<string[]>;
  public destOptions: Observable<string[]>;

  availableFlights: Array<Flight>;

  constructor(private formBuilder: FormBuilder, private airportService: AirportService, private flightService: FlightService, private weatherService: WeatherService) {
    this.submitted = false;
    this.success = false;

    this.searchForm = this.formBuilder.group({
      source: ['', [Validators.required]], 
      destination: ['', [Validators.required]],
      numAdults: ['1', [Validators.min(0)]],
      numChildren: ['1', [Validators.min(0)]],
      numInfants: ['0'],
      departureDate: [moment().format('MM/DD/YYYY'), [Validators, Validators.min(Date.now())]],
      arrivalDate: [moment().format('MM/DD/YYYY'), [Validators, Validators.min(Date.now())]],
      seatingClass: ['E'],
      counter: ['100']
    });
   }

  ngOnInit() {
        
    this.options = this.fillAirportOptions();

    this.sourceOptions = this.searchForm.controls.source.valueChanges
      .pipe(
        startWith(''),
        map((value: string  ) => this.filter(value))
      );

      this.destOptions = this.searchForm.controls.destination.valueChanges
      .pipe(
        startWith(''),
        map((value: string  ) => this.filter(value))
      );
  }

  public onSubmit() {
    this.submitted = true;

    var destinationCity = this.airportService.GetAirportCity((this.searchForm.controls.destination.value as string).split('-')[0]);

    this.weatherService.GetForecast(destinationCity, this.searchForm.controls.arrivalDate.value).subscribe(data => {
      this.weather = data;
    });
    
    this.flightService.GetFlights(this.searchForm.value).subscribe(data => {
      this.availableFlights = data;
      this.success = true;
    });

    //used for test purpose while FlightApi is down
    //this.availableFlights = this.flightService.GetFlightsTestData(this.searchForm.value);
    //this.success = true;
    
    
    this.submitted = false;
  }

  private fillAirportOptions(): string[] {
    return this.airportService.GetAirports();
  }

  private filter(value: string): string[] {
    if(!isNullOrUndefined(value))
    {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
    return this.options;
  }
}


