import type { Units } from "../App";
import { iconCheckmark } from "../assets";

type UnitType = "Temperature" | "Wind Speed" | "Precipitation";

type UnitsMenuProps = {
  unitsDisplay: Units;
  onChangeUnit: (unit: Units) => void;
};

export const UnitsMenu = ({ unitsDisplay, onChangeUnit }: UnitsMenuProps) => {
  const units: {
    name: UnitType;
    units: string[];
  }[] = [
    {
      name: "Temperature",
      units: ["Celsius(°C)", "Fahrenheit(°F)"],
    },
    {
      name: "Wind Speed",
      units: ["km/h", "mph"],
    },
    {
      name: "Precipitation",
      units: ["Millimeters(mm)", "inches(in)"],
    },
  ];

  const isImperial = unitsDisplay.Temperature === "Fahrenheit(°F)";

  function handleUnitToggle() {
    if (isImperial) {
      onChangeUnit({
        Temperature: "Celsius(°C)",
        "Wind Speed": "km/h",
        Precipitation: "Millimeters(mm)",
      });
    } else {
      onChangeUnit({
        Temperature: "Fahrenheit(°F)",
        "Wind Speed": "mph",
        Precipitation: "inches(in)",
      });
    }
  }

  return (
    <div className="bg-surface border-border absolute top-full right-0 z-20 w-70 translate-y-4 rounded-xl border-2 p-2">
      <button
        type="button"
        onClick={handleUnitToggle}
        className="w-full text-start text-lg cursor-pointer hover:bg-surface-elevated rounded-xl px-4 py-2"
      >
        {isImperial ? "Switch to Metric" : "Switch to Imperial"}
      </button>
      <ul>
        {units.map(({ name, units }) => (
          <li key={name} className="py-1 text-start">
            <p className="text-text-muted py-4 px-4">{name}</p>
            <ul className="space-y-2">
              {units.map((unit) => (
                <li key={unit}>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeUnit({
                        ...unitsDisplay,
                        [name]: unit,
                      })
                    }
                    className={`${unitsDisplay[name] === unit ? "bg-surface-elevated" : "hover:bg-surface-elevated"} flex w-full items-center justify-between rounded-xl px-4 py-1 cursor-pointer`}
                  >
                    <span className="py-1 text-lg">{unit}</span>

                    {unitsDisplay[name] === unit && (
                      <img src={iconCheckmark} alt="" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
