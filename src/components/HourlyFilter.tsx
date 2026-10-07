type hourlyFilterProps = {
  onFilter: (day: string) => void;
  onClick: (status: boolean) => void;
  isOpen: boolean;
};

export const HourlyFilter = ({
  onFilter,
  onClick,
  isOpen,
}: hourlyFilterProps) => {
  type HourlyFilter =
    | "Today"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

  const hourlyFilter: HourlyFilter[] = [
    "Today",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <ul
      className={`menu ${isOpen ? "open" : ""} bg-surface border-border absolute top-full z-30 right-0 w-50 translate-y-2 rounded-xl border px-4`}
    >
      {hourlyFilter.map((item) => (
        <li key={item} className="py-2">
          <button
            type="button"
            onClick={() => {
              onFilter(item);
              onClick(false);
            }}
            className="hover:bg-surface-elevated w-full cursor-pointer rounded-xl px-4 py-2 text-start"
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};
