export class WeatherCondition
{
    weather: Weather[];
    Main: Main;
    wind: Wind;
    dt: number;
    date: Date;
}

class Weather
{
    Main: string;
    Description: string;
    Icon: string;
}

class Main {

    Temp: number;
    Humidity: number;
    Pressure: number;
}

class Wind {
    speed: number; 
}