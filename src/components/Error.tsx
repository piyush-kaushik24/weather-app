import { iconError, iconRetry } from "../assets";
type ErrorProps = {
  weatherError: string | null;
  getWeather: (latitude: number, longitude: number) => void;
  latitude?: number;
  longitude?: number;
};
export const Error = ({
  getWeather,
  latitude,
  longitude,
  weatherError,
}: ErrorProps) => {
  if (!weatherError) {
    return null;
  }
  return (
    <div className="mt-50 flex flex-col items-center gap-6">
      <img src={iconError} alt="" className="w-20" />

      <h1 className="text-center text-4xl">Something went wrong </h1>
      <p className="text-center text-xl">
        We couldn't connect to the server(API error).Please try again in a few
        moments.
      </p>
      <button
        type="button"
        onClick={() => {
          if (latitude !== undefined && longitude !== undefined) {
            getWeather(latitude, longitude);
          }
        }}
        className="bg-surface-elevated flex gap-4 rounded-lg px-4 py-2"
      >
        <img src={iconRetry} alt="" />
        <span>Retry</span>
      </button>
    </div>
  );
};
