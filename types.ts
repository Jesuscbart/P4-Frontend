// Tipo de datos Localización
export type Location = {
  lat: number;
  lon: number;
}

// Tipo de datos Datos meteorológicos
export type WeatherData = {
  location: Location;
  time: string;
  current : {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    surface_pressure: number;
    wind_speed_10m: number;
  };
}

// Interfaz de las coordenadas de las ciudades
export interface Cities {
  [key: string]: Location;
}

// Interfaz de códigos de tiempo meteorológico
export interface WeatherCodes {
  [index: number]: string;
}