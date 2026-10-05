import { useEffect, useState } from "react";

export const useDebounce = (search: string) => {
  const [value, setValue] = useState(search);
  const DEBOUNCE_VALUE = 500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(search);
    }, DEBOUNCE_VALUE);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  return value;
};
