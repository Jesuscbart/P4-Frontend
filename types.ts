export type Location = {
  lat: number;
  lon: number;
}

export type WeatherData = {
  location: Location;
  time: string;
  current : {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
}

export interface Cities {
  [key: string]: Location;
}