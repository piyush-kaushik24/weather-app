import { useState } from "react";
import type { Units } from "../App";
import { iconDropdown, iconUnits, logo } from "../assets";
import { UnitsMenu } from "./UnitsMenu";

type HeaderProps = {
  unitsDisplay: Units;
  onChangeUnit: (unit: Units) => void;
};

export const Header = ({ unitsDisplay, onChangeUnit }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-background border-border shadow-surface-elevated sticky top-5 z-50 flex items-center justify-between rounded-xl border-2 px-4 py-2 shadow-lg md:top-10 md:mx-auto lg:max-w-5xl">
      <a href="#">
        {" "}
        <img src={logo} alt="" className="w-40" />
      </a>

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-surface-elevated flex items-center justify-center gap-2 rounded-lg px-3 py-1 cursor-pointer hover:bg-surface"
      >
        <img src={iconUnits} alt="" />
        <span>Units</span>
        <img src={iconDropdown} alt="" />
      </button>
      {isOpen ? (
        <UnitsMenu unitsDisplay={unitsDisplay} onChangeUnit={onChangeUnit} />
      ) : null}
    </header>
  );
};
