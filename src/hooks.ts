import { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timer to update debouncedValue after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timeout if value changes before delay finishes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
