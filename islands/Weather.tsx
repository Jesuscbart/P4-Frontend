import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Location, WeatherData } from "../types.ts";
import WeatherComponent from "../components/WeatherComponent.tsx";
import { cityCoordinates } from "../cityCoordinates.ts";

const Weather = () => {
  // Señales
  const city = useSignal("Madrid"); // Señal de tipo string que se inicializa con "Madrid"
  const location = useSignal<Location>(cityCoordinates[city.value]); // Señal de tipo Location que se inicializa con las coordenadas de la ciudad seleccionada
  const weather = useSignal<WeatherData>({ location: { lat: 0, lon: 0 }, time: "", current: { temperature_2m: 0, relative_humidity_2m: 0, wind_speed_10m: 0 } }); // Señal de tipo WeatherData que se inicializa con un objeto vacío

  useEffect(() => { // Hook de efecto para actualizar la ubicación cuando cambia la ciudad
    location.value = cityCoordinates[city.value];
  }, [city.value]);

  useEffect(() => { // Hook de efecto para actualizar los datos meteorológicos cuando cambia la ubicación
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.value.lat}&longitude=${location.value.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`)  // Petición GET a la API de productos. page.value es el valor actual de la señal page
      .then((response) => response.json())  // La respuesta se convierte a JSON
      .then((data) => {   // Cuando se resuelva la promesa, se asigna el valor de data a la señal products
        weather.value = data;
      });
  }, [location.value]); // Se ejecuta el hook de efecto siempre que cambie el valor de location.value

  return (
    <WeatherComponent city={city} cityCoordinates={cityCoordinates} location={location} weather={weather} />
  );
};

export default Weather;