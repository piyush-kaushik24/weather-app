import type { Units } from "../App";
import { bgTodayLarge, bgTodaySmall } from "../assets";
import type { Weather } from "../types/types";
import { celsiusToFahrenheit } from "../utils/units";
import { HeroSkeleton } from "./skeletons/HeroSkeleton";
import { getWeatherIcon } from "./WeatherIcons";

type WeatherHeroProps = {
  weather: Weather | null;
  loadingWeather: boolean;
    unitsDisplay: Units;
};

export const WeatherHero = ({ weather, loadingWeather,unitsDisplay }: WeatherHeroProps) => {
  if (!weather) {
    return <HeroSkeleton loadingWeather={loadingWeather} />;
  }
 

  const date = new Date(weather.current.time);

  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
      const currentTemperature =
        unitsDisplay.Temperature === "Fahrenheit(°F)"
          ? celsiusToFahrenheit(weather.current.apparent_temperature)
          : weather.current.apparent_temperature;

  return (
    <section className="relative h-75">
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:p-8">
        <div className="space-y- text-center">
          <h2 className="text-3xl">{weather?.timezone.replace("/", ", ")}</h2>

          <p className="text-text-muted mt-4">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={getWeatherIcon(weather.current.weather_code)}
            alt=""
            className="w-30"
          />
          <p className="text-8xl italic">{Math.round(currentTemperature)}°</p>
        </div>
      </div>
      <picture>
        <source srcSet={bgTodayLarge} media="(min-width: 768px)" />
        <img
          src={bgTodaySmall}
          alt=""
          className="absolute top-0 h-full w-full rounded-2xl object-cover"
        />
      </picture>
    </section>
  );
};
