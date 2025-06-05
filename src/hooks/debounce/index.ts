import { useEffect, useState } from "react";
/**
 * @name UseDebounce
 * @function
 * @description manage debounce functionality for a value
 * @param value the value to debounce
 * @param delay the delay in milliseconds
 * @returns the debounced value
 */
export function UseDebounce<T>(
  value: T,
  onClick: (value: T) => void,
  delay: number = 500,
  watchedValues: any[]
) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
      onClick(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay, ...watchedValues]);
  return { debouncedValue };
}
