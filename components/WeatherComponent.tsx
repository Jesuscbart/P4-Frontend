import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { Location, WeatherData } from "../types.ts";
import { useState } from "preact/hooks";
import { weatherCodes } from "../weatherCodes.ts";

// Props que recibe el componente
type Props = {
  city: Signal<string>; // Señal de la ciudad seleccionada
  cityCoordinates: { [key: string]: Location }; // Coordenadas de las ciudades
  location: Signal<Location>; // Señal de la localización
  weather: Signal<WeatherData>; // Señal de los datos meteorológicos
};
const WeatherComponent: FunctionComponent<Props> = ({ city, cityCoordinates, location, weather }) => {

    // Estados para mostrar los datos
    const [showTemperature, setShowTemperature] = useState(false);
    const [showApparentTemperature, setShowApparentTemperature] = useState(false);
    const [showWeatherCode, setShowWeatherCode] = useState(false); 
    const [showHumidity, setShowHumidity] = useState(false);
    const [showCloudCover, setShowCloudCover] = useState(false);
    const [showSurfacePressure, setShowSurfacePressure] = useState(false);
    const [showWindSpeed, setShowWindSpeed] = useState(false);

  return (
      <>
        <h1 class="mainTitle">Weather Application</h1>
          <div class="weather">
            <div class="location">
                <p>Ciudad: </p>
                <select value={city.value} onInput={(e) => city.value = e.currentTarget.value}>
                  {Object.keys(cityCoordinates).map(cityName => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
            </div>

            <div class="coordinates">
              <p>Latitud: {location.value.lat}</p>
              <p>Longitud: {location.value.lon}</p>
            </div>

            <div>
              <p>Seleccione los datos que desea visualizar: </p><hr></hr>
                <label>
                    <input type="checkbox" checked={showWeatherCode} onChange={() => setShowWeatherCode(!showWeatherCode)} />
                    Mostrar descripción del tiempo
                </label>
                <label>
                    <input type="checkbox" checked={showTemperature} onChange={() => setShowTemperature(!showTemperature)} />
                    Mostrar temperatura
                </label>
                <label>
                    <input type="checkbox" checked={showApparentTemperature} onChange={() => setShowApparentTemperature(!showApparentTemperature)} />
                    Mostrar sensación térmica
                </label>
                <label>
                    <input type="checkbox" checked={showHumidity} onChange={() => setShowHumidity(!showHumidity)} />
                    Mostrar humedad
                </label>
                <label>
                    <input type="checkbox" checked={showWindSpeed} onChange={() => setShowWindSpeed(!showWindSpeed)} />
                    Mostrar velocidad del viento
                </label>
                <label>
                    <input type="checkbox" checked={showCloudCover} onChange={() => setShowCloudCover(!showCloudCover)} />
                    Mostrar cobertura de nubes
                </label>
                <label>
                    <input type="checkbox" checked={showSurfacePressure} onChange={() => setShowSurfacePressure(!showSurfacePressure)} />
                    Mostrar presión atmosférica
                </label>
                <hr></hr>
            </div>

            <div class="data">
                <span>Datos: {weather.value.time}</span>
                {showWeatherCode && <span>Descripción: {weatherCodes[weather.value.current.weather_code]}</span>}
                {showTemperature && <span>Temperatura: {weather.value.current.temperature_2m} °C</span>}
                {showApparentTemperature && <span>Sensación térmica: {weather.value.current.apparent_temperature} °C</span>}
                {showHumidity && <span>Humedad: {weather.value.current.relative_humidity_2m} %</span>}
                {showWindSpeed && <span>Velocidad del viento: {weather.value.current.wind_speed_10m} m/s</span>}
                {showCloudCover && <span>Cobertura de nubes: {weather.value.current.cloud_cover} %</span>}
                {showSurfacePressure && <span>Presión atmosférica: {weather.value.current.surface_pressure} hPa</span>}
            </div>
          </div>
      </>
    );
};

export default WeatherComponent;