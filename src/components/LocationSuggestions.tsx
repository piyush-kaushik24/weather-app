import { useEffect, useRef } from "react";
import type { Locations } from "../types/types";
import { Loading } from "./Loading";
import { ErrorSuggestions } from "./skeletons/ErrorSuggestions";

type LocationSuggestionsProps = {
  locations: Locations[];
  loading: boolean;
  search: string;
  getWeather: (longitude: number, latitude: number) => void;
  onClickSuggestion: (status: boolean) => void;
  isClicked: boolean;
  onSearchWeather: (weather: null) => void;
  debounceSearch: string;
};
export const LocationSuggestions = ({
  locations,
  loading,
  search,
  getWeather,
  onClickSuggestion,
  onSearchWeather,
  isClicked,
  debounceSearch,
}: LocationSuggestionsProps) => {
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!suggestionsRef.current?.contains(e.target as Node)) {
        onClickSuggestion(false);
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClickSuggestion]);

  return (
    <div
      ref={suggestionsRef}
      className="bg-surface scrollbar-hidden absolute top-full z-30 max-h-75 w-full translate-y-2 overflow-y-auto rounded-xl"
    >
      {isClicked && search.length > 0 ? (
        <>
          {loading && <Loading />}
          {!loading &&
            locations.length === 0 &&
            debounceSearch === search &&
            debounceSearch.trim() !== "" && <ErrorSuggestions />}
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
