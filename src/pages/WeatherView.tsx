import { useEffect, useState } from "react";
import type { Units } from "../App";
import { DailyForecast } from "../components/DailyForecast";
import { Error } from "../components/Error";
import { HourlyForecast } from "../components/HourlyForecast";
import { LocationSuggestions } from "../components/LocationSuggestions";
import { SearchBar } from "../components/SearchBar";
import { WeatherAside } from "../components/WeatherAside";
import { WeatherHero } from "../components/WeatherHero";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { useFetchWeather } from "../hooks/useFetchWeather";

type WeatherViewProp = {
  unitsDisplay: Units;
};
export const WeatherView = ({ unitsDisplay }: WeatherViewProp) => {
  const { getPlace, value: locations, error, loading } = useFetch();
 const {
   getWeather,
   weather,
   setWeather,
   loading: loadingWeather,
   error: weatherError,
   lastLocation,
 } = useFetchWeather();

  const [isClicked, setIsClicked] = useState(true);
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search);
  useEffect(() => {
    getPlace(debounceSearch);
  }, [debounceSearch]);

  function handleSearch(search: string) {
    setSearch(search);
  }
  function handleSuggestions(status: boolean) {
    setIsClicked(status);
  }
  function handleWeatherStatus(weather: null) {
    setWeather(weather);
  }
  if (error) {
    return (
      <Error
        weatherError={weatherError}
        getWeather={getWeather}
        latitude={lastLocation?.latitude}
        longitude={lastLocation?.longitude}
      />
    );
  }

  return (
    <main className="mb-10">
      <h1 className="font-display my-10 p-6 text-center text-5xl leading-normal md:mt-15">
        {" "}
        How's the Sky looking today?
      </h1>
      <div className="relative md:mx-auto lg:max-w-4xl">
        <SearchBar
          search={search}
          onSearch={handleSearch}
          onClickSuggestion={handleSuggestions}
        />

        <LocationSuggestions
          locations={locations}
          loading={loading}
          search={search}
          onClickSuggestion={handleSuggestions}
          isClicked={isClicked}
          getWeather={getWeather}
          onSearchWeather={handleWeatherStatus}
        />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row xl:justify-center">
        <div className="grid gap-6">
          <WeatherHero weather={weather} loadingWeather={loadingWeather} />
          <WeatherAside
            weather={weather}
            loadingWeather={loadingWeather}
            unitsDisplay={unitsDisplay}
          />
          <DailyForecast
            weather={weather}
            loadingWeather={loadingWeather}
            unitsDisplay={unitsDisplay}
          />
        </div>
        <HourlyForecast
          weather={weather}
          loadingWeather={loadingWeather}
          unitsDisplay={unitsDisplay}
        />
      </div>
    </main>
  );
};
