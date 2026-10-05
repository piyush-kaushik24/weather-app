import { iconError } from "../../assets";

export const ErrorSuggestions = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <img src={iconError} alt="" />
      <p>Searched location not found</p>
    </div>
  );
};
