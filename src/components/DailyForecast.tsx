import type { Units } from "../App";
import type { Weather } from "../types/types";
import { celsiusToFahrenheit } from "../utils/units";
import { DailySkeleton } from "./skeletons/DailySkeleton";
import { getWeatherIcon } from "./WeatherIcons";

type DailyForecastProps = {
  weather: Weather | null;
  loadingWeather: boolean;
  unitsDisplay: Units;
};
export const DailyForecast = ({
  weather,
  loadingWeather,
  unitsDisplay,
}: DailyForecastProps) => {
  if (!weather) {
    return <DailySkeleton loadingWeather={loadingWeather} />;
  }
  const {
    daily: { time, weather_code, temperature_2m_max, temperature_2m_min },
  } = weather;

  const dailyForecast = time.map((date, index) => ({
    date,
    day: new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    }),
    weatherCode: weather_code[index],
    maxTemperature: temperature_2m_max[index],
    minTemperature: temperature_2m_min[index],
  }));

  return (
    <section>
      <h2 className="pb-4 text-2xl">Daily forecast</h2>
      <ul className="grid grid-cols-3 gap-4 md:grid-cols-7">
        {dailyForecast.map(
          ({ date, day, weatherCode, maxTemperature, minTemperature }) => {
            const displayTemperatureMax =
              unitsDisplay.Temperature === "Fahrenheit(°F)"
                ? celsiusToFahrenheit(maxTemperature)
                : maxTemperature;
            const displayTemperatureMin =
              unitsDisplay.Temperature === "Fahrenheit(°F)"
                ? celsiusToFahrenheit(minTemperature)
                : minTemperature;

            return (
              <li
                key={date}
                className="bg-surface card-action border-border flex flex-col items-center gap-4 rounded-xl border p-4"
              >
                <p className="text-center">{day}</p>
                <div className="bg-background rounded-full">
                  <img
                    src={getWeatherIcon(weatherCode)}
                    alt=""
                    className="max-w-15"
                  />
                </div>
                <div className="flex w-full justify-between">
                  <span>{Math.round(displayTemperatureMax)}°</span>
                  <span className="text-text-muted">
                    {Math.round(displayTemperatureMin)}°
                  </span>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
};
