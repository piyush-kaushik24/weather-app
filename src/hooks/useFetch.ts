import { useRef, useState } from "react";
import type { Locations } from "../types/types";

export const useFetch = () => {
  const [value, setValue] = useState<Locations[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  async function getPlace(search: string) {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}`,
        { signal: controller.signal },
      );
      if (!response.ok) throw new Error(`Request failed ${response.status}`);
      const data = await response.json();
      setValue(data.results ?? []);
    } catch (error) {
      if (controller.signal.aborted) return;
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      if (controllerRef.current === controller) setLoading(false);
    }
  }

  return { value, error, loading, getPlace };
};
