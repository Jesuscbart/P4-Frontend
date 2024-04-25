import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Location, WeatherData } from "../types.ts";
import WeatherComponent from "../components/WeatherComponent.tsx";
import { cityCoordinates } from "../cityCoordinates.ts";

const Weather = () => {
  // Señales
  const city = useSignal("Madrid"); // Señal de tipo string que se inicializa por defecto con "Madrid"
  const location = useSignal<Location>(cityCoordinates[city.value]); // Señal de tipo Location que se inicializa con las coordenadas de la ciudad actual
  const weather = useSignal<WeatherData>( // Señal de tipo WeatherData que se inicializa con un objeto vacío
    { 
      location: { lat: 0, lon: 0 }, time: "", 
      current: { 
        temperature_2m: 0, 
        apparent_temperature: 0,
        weather_code: 0,
        relative_humidity_2m: 0, 
        wind_speed_10m: 0,
        cloud_cover: 0,
        surface_pressure: 0
      }
    }
  );

  useEffect(() => { // Hook de efecto para actualizar la ubicación cuando cambia la ciudad
    location.value = cityCoordinates[city.value];
  }, [city.value]);

  useEffect(() => { // Hook de efecto para actualizar los datos meteorológicos cuando cambia la ubicación
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.value.lat}&longitude=${location.value.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,surface_pressure,wind_speed_10m`)
      .then((response) => response.json())  // La respuesta se convierte a JSON
      .then((data) => {   
        weather.value = data; 
      })
      .catch((error) => { // Si hay un error, se muestra en la consola
        console.error('Error:', error);
      });
  }, [location.value]); // Se ejecuta el hook de efecto siempre que cambie el valor de location.value

  return (
    <WeatherComponent city={city} cityCoordinates={cityCoordinates} location={location} weather={weather} />
  );
};

export default Weather;