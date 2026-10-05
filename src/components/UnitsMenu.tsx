import { useEffect, useRef } from "react";
import type { Units } from "../App";
import { iconCheckmark } from "../assets";

type UnitType = "Temperature" | "Wind Speed" | "Precipitation";

type UnitsMenuProps = {
  unitsDisplay: Units;
  onChangeUnit: (unit: Units) => void;
  onClick: (status: boolean) => void;
};

export const UnitsMenu = ({
  unitsDisplay,
  onChangeUnit,
  onClick,
}: UnitsMenuProps) => {
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
  const unitsMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!unitsMenuRef.current?.contains(e.target as Node)) {
        onClick(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClick]);

  return (
    <div
      ref={unitsMenuRef}
      className="bg-surface border-border absolute top-full right-0 z-20 w-70 translate-y-4 rounded-xl border-2 p-2"
    >
      <button
        type="button"
        onClick={handleUnitToggle}
        className="hover:bg-surface-elevated w-full cursor-pointer rounded-xl px-4 py-2 text-start text-lg"
      >
        {isImperial ? "Switch to Metric" : "Switch to Imperial"}
      </button>
      <ul>
        {units.map(({ name, units }) => (
          <li key={name} className="py-1 text-start">
            <p className="text-text-muted px-4 py-4">{name}</p>
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
                    className={`${unitsDisplay[name] === unit ? "bg-surface-elevated" : "hover:bg-surface-elevated"} flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-1`}
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
