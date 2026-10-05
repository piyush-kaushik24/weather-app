import type { Locations } from "../types/types";
import { Loading } from "./Loading";

type LocationSuggestionsProps = {
  locations: Locations[];
  loading: boolean;
  search: string;
  getWeather: (longitude: number, latitude: number) => void;
  onClickSuggestion: (status: boolean) => void;
  isClicked: boolean;
  onSearchWeather: (weather: null) => void;
};
export const LocationSuggestions = ({
  locations,
  loading,
  search,
  getWeather,
  onClickSuggestion,
  onSearchWeather,
  isClicked,
}: LocationSuggestionsProps) => {
  return (
    <div className="bg-surface scrollbar-hidden absolute top-full z-30 max-h-75 w-full translate-y-2 overflow-y-auto rounded-xl">
      {isClicked && search.length > 0 ? (
        <>
          {loading && <Loading />}
          <ul>
            {locations.map((items) => (
              <li key={items.id} className="border-border border-b">
                <button
                  type="button"
                  onClick={() => {
                    onClickSuggestion(false);
                    getWeather(items.latitude, items.longitude);
                    onSearchWeather(null);
                  }}
                  className="w-full px-4 py-2 text-start"
                >
                  <div className="flex">
                    <p>{items.name} , </p>
                    <p>{items.country}</p>
                  </div>
                  <p className="text-text-muted block text-sm">
                    {items.admin1}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
