import type { Units } from "../App";
import type { Weather } from "../types/types";
import { celsiusToFahrenheit, kmhToMph, mmToInches } from "../utils/units";
import { AsideSkeleton } from "./skeletons/AsideSkeleton";
type WeatherAsideProps = {
  weather: Weather | null;
  loadingWeather: boolean;
  unitsDisplay: Units;
};
export const WeatherAside = ({
  weather,
  loadingWeather,
  unitsDisplay,
}: WeatherAsideProps) => {
  if (!weather) {
    return <AsideSkeleton loadingWeather={loadingWeather} />;
  }
  const {
    current: {
      apparent_temperature,
      relative_humidity_2m,
      wind_speed_10m,
      precipitation,
    },
  } = weather;
  const currentTemperature =
    unitsDisplay.Temperature === "Fahrenheit(°F)"
      ? celsiusToFahrenheit(apparent_temperature)
      : apparent_temperature;
  const windSpeed =
    unitsDisplay["Wind Speed"] === "mph"
      ? kmhToMph(wind_speed_10m)
      : wind_speed_10m;

  const displayPrecipitation =
    unitsDisplay.Precipitation === "inches(in)"
      ? mmToInches(precipitation)
      : precipitation;

  const weatherDetails = [
    {
      title: "Feels Like",
      value: Math.round(currentTemperature),
      unit: "°",
    },
    {
      title: "Humidity",
      value: relative_humidity_2m,
      unit: "%",
    },
    {
      title: "Wind",
      value: Math.round(windSpeed),
      unit: unitsDisplay["Wind Speed"] === "mph" ? "mph" : "km/h",
    },
    {
      title: "Precipitation",
      value: Math.round(displayPrecipitation),
      unit: unitsDisplay.Precipitation === "inches(in)" ? "in" : "mm",
    },
  ];
  return (
    <aside>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {weatherDetails.map(({ title, value, unit }) => (
          <li
            key={title}
            className="bg-surface border-border flex flex-col gap-4 rounded-xl border p-4"
          >
            <p className="text-text-muted">{title}</p>
            <div className="flex gap-2 text-3xl">
              <p>{value}</p>
              <span> {unit}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};
