import { iconSearch } from "../assets";

type SearchBarProps = {
  search: string;
  onSearch: (search: string) => void;
  onClickSuggestion: (status: boolean) => void;
};

export const SearchBar = ({
  search,
  onSearch,
  onClickSuggestion,
}: SearchBarProps) => {
  return (
    <div className="bg-surface mb-6 flex gap-4 rounded-xl p-4 focus-within:ring-2 hover:bg-surface-elevated">
      <img src={iconSearch} alt="" />
      <label htmlFor="search" className="sr-only">
        Search for a place
      </label>
      <input
        type="text"
        enterKeyHint="go"
        name="search"
        value={search}
        id="search"
        placeholder="Search for a place..."
        onChange={(e) => {
          onSearch(e.target.value);
          onClickSuggestion(true);
        }}
        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        className="w-full appearance-none outline-hidden"
      />
    </div>
  );
};
