import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { Location, WeatherData } from "../types.ts";

type Props = {
  city: Signal<string>;
  cityCoordinates: { [key: string]: Location };
  location: Signal<Location>;
  weather: Signal<WeatherData>;
};

const WeatherComponent: FunctionComponent<Props> = ({ city, cityCoordinates, location, weather }) => {
    return (
        
        <div class="weather">
            <h1>Weather</h1>
            <select value={city.value} onInput={(e) => city.value = e.currentTarget.value}>
              {Object.keys(cityCoordinates).map(city => (
                  <option value={city}>{city}</option>
              ))}
            </select>
            <div class="location">
                <span>City: {city.value}</span><br></br>
                <span>Latitude: {location.value.lat}</span>
                <br></br>
                <span>Longitude: {location.value.lon}</span>
            </div>
            <div class="data">
                <span>Time: {weather.value.time}</span>
                <span>Temperature: {weather.value.current.temperature_2m}°C</span><br></br>
                <span>Humidity: {weather.value.current.relative_humidity_2m}%</span><br></br>
            </div>
        </div>
    );
};

export default WeatherComponent;