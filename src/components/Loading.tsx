import { iconLoading } from "../assets";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <img src={iconLoading} alt="" className="animate-spin" />
      <p>Search in progress</p>
    </div>
  );
};
