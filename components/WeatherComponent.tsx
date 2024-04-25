import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { Location, WeatherData } from "../types.ts";
import { useState } from "preact/hooks";

type Props = {
  city: Signal<string>;
  cityCoordinates: { [key: string]: Location };
  location: Signal<Location>;
  weather: Signal<WeatherData>;
};

const WeatherComponent: FunctionComponent<Props> = ({ city, cityCoordinates, location, weather }) => {
    const [showTemperature, setShowTemperature] = useState(false);
    const [showHumidity, setShowHumidity] = useState(false);
    const [showWindSpeed, setShowWindSpeed] = useState(false);

  return (
      <>
        <h1 class="mainTitle">Weather</h1>
          <div class="weather">
            
            <div class="location">
                <p>Ciudad: </p>
                <select value={city.value} onInput={(e) => city.value = e.currentTarget.value}>
                  {Object.keys(cityCoordinates).map(city => (
                      <option value={city}>{city}</option>
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
                    <input type="checkbox" checked={showTemperature} onChange={() => setShowTemperature(!showTemperature)} />
                    Mostrar temperatura
                </label>
                <label>
                    <input type="checkbox" checked={showHumidity} onChange={() => setShowHumidity(!showHumidity)} />
                    Mostrar humedad
                </label>
                <label>
                    <input type="checkbox" checked={showWindSpeed} onChange={() => setShowWindSpeed(!showWindSpeed)} />
                    Mostrar velocidad del viento
                </label>
                <hr></hr>
            </div>

            <div class="data">
                <span>Datos: {weather.value.time}</span>
                {showTemperature && <span>Temperature: {weather.value.current.temperature_2m}°C</span>}
                {showHumidity && <span>Humidity: {weather.value.current.relative_humidity_2m}%</span>}
                {showWindSpeed && <span>Wind Speed: {weather.value.current.wind_speed_10m}m/s</span>}
            </div>
          </div>
      </>
    );
};

export default WeatherComponent;