import { useEffect, useRef, useState } from "react";
import type { Units } from "../App";
import { iconDropdown, iconUnits, logo } from "../assets";
import { UnitsMenu } from "./UnitsMenu";

type HeaderProps = {
  unitsDisplay: Units;
  onChangeUnit: (unit: Units) => void;
};

export const Header = ({ unitsDisplay, onChangeUnit }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unitsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!unitsRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <header className="bg-background border-border shadow-surface-elevated sticky top-5 z-50 flex items-center justify-between rounded-xl border-2 px-4 py-2 shadow-lg md:top-10 md:mx-auto lg:max-w-5xl">
      <a href="#" aria-label="Weather Now">
        <img src={logo} alt="" className="w-40" />
      </a>

      <div ref={unitsRef} className="relative">
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-surface-elevated hover:bg-surface bu flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-1"
        >
          <img src={iconUnits} alt="" />
          <span>Units</span>
          <img src={iconDropdown} alt="" />
        </button>

        <UnitsMenu
          unitsDisplay={unitsDisplay}
          onChangeUnit={onChangeUnit}
          isOpen={isOpen}
        />
      </div>
    </header>
  );
};
