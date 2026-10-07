import { useState } from "react";
import type { Units } from "../App";
import { iconDropdown } from "../assets";
import type { Weather } from "../types/types";
import { celsiusToFahrenheit } from "../utils/units";
import { HourlyFilter } from "./HourlyFilter";
import { HourlySkeleton } from "./skeletons/HourlySkeleton";
import { getWeatherIcon } from "./WeatherIcons";
type HourlyForecastProps = {
  weather: Weather | null;
  loadingWeather: boolean;
  unitsDisplay: Units;
};
export const HourlyForecast = ({
  weather,
  loadingWeather,
  unitsDisplay,
}: HourlyForecastProps) => {
  const [filterHourly, setFilterHourly] = useState("Today");
  const [isOpen, setIsOpen] = useState(false);
  if (!weather) {
    return <HourlySkeleton loadingWeather={loadingWeather} />;
  }
  function handleFilter(day: string) {
    if (!weather) return;

    const todayName = new Date(`${weather.current.time}Z`).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        timeZone: "UTC",
      },
    );

    setFilterHourly(day === todayName ? "Today" : day);
  }
  function handleClick(status: boolean) {
    setIsOpen(status);
  }

  const {
    hourly: { time, temperature_2m, weather_code },
  } = weather;

  const hourlyForecast = time.map((date, index) => {
    const formattedDate = new Date(`${date}Z`).toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    });

    const formattedTime = new Date(`${date}Z`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
    return {
      date,
      day: formattedDate,
      time: formattedTime,

      temperature: temperature_2m[index],
      weatherCode: weather_code[index],
    };
  });

  const today = weather.current.time.slice(0, 10);

  const FilteredForecast = hourlyForecast.filter((day) =>
    filterHourly === "Today"
      ? day.date.slice(0, 10) === today
      : day.day === filterHourly,
  );
  return (
    <section className="bg-surface rounded-xl p-4 xl:w-100">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl">Hourly forecast</h2>
        <div className="relative">
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-surface-elevated button flex cursor-pointer gap-4 rounded-xl px-4 py-2"
          >
            <span>{filterHourly}</span>
            <img src={iconDropdown} alt="" />
          </button>

          <HourlyFilter
            onFilter={handleFilter}
            onClick={handleClick}
            isOpen={isOpen}
          />
        </div>
      </div>
      <ul className="scrollbar-hidden grid max-h-145 gap-4 overflow-auto">
        {FilteredForecast.map(({ date, time, temperature, weatherCode }) => {
          const displayTemperature =
            unitsDisplay.Temperature === "Fahrenheit(°F)"
              ? celsiusToFahrenheit(temperature)
              : temperature;

          return (
            <li
              key={date}
              className="bg-surface-elevated hourly-card border-border flex items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-surface rounded-full">
                  <img
                    src={getWeatherIcon(weatherCode)}
                    alt=""
                    className="w-12"
                  />
                </div>

                <p className="text-xl">{time}</p>
              </div>
              <p className="text-xl">{Math.round(displayTemperature)}°</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
