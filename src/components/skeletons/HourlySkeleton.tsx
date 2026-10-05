import { iconDropdown } from "../../assets";
import { HourlyLoading } from "./HourlyLoading";
type HourlySkeletonProp = {
  loadingWeather: boolean;
};
export const HourlySkeleton = ({ loadingWeather }: HourlySkeletonProp) => {
  const hourly = Array.from({ length: 7 }).fill(null);
  return (
    <div className="bg-surface rounded-xl p-4 xl:w-100">
      <div className="flex items-center justify-between py-3">
        <div className="text-xl">Hourly forecast</div>
        <div className="relative">
          <button
            type="button"
            disabled={true}
            className="bg-surface-elevated flex cursor-not-allowed gap-4 rounded-xl px-4 py-2"
          >
            <span>-</span>
            <img src={iconDropdown} alt="" />
          </button>
        </div>
      </div>
      <ul className="scrollbar-hidden grid max-h-130 gap-4 overflow-auto">
        {hourly.map((_, index) => (
          <li key={index}>
            {loadingWeather ? (
              <HourlyLoading />
            ) : (
              <div className="bg-surface-elevated border-border h-full rounded-xl border p-8"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
