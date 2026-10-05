import { useState } from "react";
import type { Locations } from "../types/types";

export const useFetch = () => {
  const [value, setValue] = useState<Locations[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function getPlace(search: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${search}`,
      );
      if (!response.ok) {
        throw new Error(`Request is failed ${response.status}`);
      }
      const data = await response.json();
      setValue(data.results ?? []);
      console.log(data.results);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return { value, error, loading, getPlace };
};
