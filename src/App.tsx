import { useState } from "react";
import { Header } from "./components/Header";
import { WeatherView } from "./pages/WeatherView";

export type Units = {
  Temperature: string;
  "Wind Speed": string;
  Precipitation: string;
};

export const App = () => {
  const [units, setUnitsDisplay] = useState<Units>({
    Temperature: "Celsius(°C)",
    "Wind Speed": "km/h",
    Precipitation: "Millimeters(mm)",
  });

  function handleUnits(unit: Units) {
    setUnitsDisplay(unit);
  }
  console.log(units);

  return (
    <div className="px-4">
      <Header unitsDisplay={units} onChangeUnit={handleUnits} />
      <WeatherView unitsDisplay={units} />
    </div>
  );
};
