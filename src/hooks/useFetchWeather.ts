import { useState } from "react";
import type { Weather } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";

export const useFetchWeather = () => {
  const [weather, setWeather] = useLocalStorage<Weather | null>(
    "weather",
    null,
  );

  const [lastLocation, setLastLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function getWeather(latitude: number, longitude: number) {
    setLastLocation({ latitude, longitude });

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&timezone=auto`,
      );

      if (!response.ok) {
        throw new Error(`Request is failed ${response.status}`);
      }

      const data = await response.json();

      setWeather(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    weather,
    error,
    loading,
    getWeather,
    setWeather,
    lastLocation,
  };
};
