import { AsideLoading } from "./AsideLoading";
type AsideSkeletonProp = {
  loadingWeather: boolean;
  
};
export const AsideSkeleton = ({ loadingWeather }: AsideSkeletonProp) => {
  const details = [
    {
      title: "Feels Like",
      value: "_",
    },
    {
      title: "Humidity",
      value: "_",
    },
    {
      title: "Wind",
      value: "_",
    },
    {
      title: "Precipitation",
      value: "_",
    },
  ];
  return (
    <ul aria-hidden = "true" className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {details.map(({ title, value }) => (
        <li key={title}>
          {loadingWeather ? (
            <AsideLoading />
          ) : (
            <span className="bg-surface border-border flex flex-col gap-4 rounded-xl border p-4">
              <span className="text-text-muted">{title}</span>
              <span className="text-3xl">{value}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
