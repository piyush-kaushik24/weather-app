import { DailyLoading } from "./DailyLoading";

type DailySkeletonProp = {
  loadingWeather: boolean;
};

export const DailySkeleton = ({ loadingWeather }: DailySkeletonProp) => {
  const days = Array.from({ length: 7 });

  return (
    <ul aria-hidden="true" className="grid grid-cols-3 gap-4 md:grid-cols-7">
      {days.map((_, index) => (
        <li key={index}>
          {loadingWeather ? (
            <DailyLoading />
          ) : (
            <div className="bg-surface border-border h-38 rounded-xl border lg:w-full xl:w-26 2xl:w-30"></div>
          )}
        </li>
      ))}
    </ul>
  );
};
