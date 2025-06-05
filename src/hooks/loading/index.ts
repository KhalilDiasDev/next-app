import { useState } from "react";

/**
 * @name LoadingHook
 * @function
 * @description manage loading state of a component
 * 
 * @param defaultValue default value of the component
 */

export function LoadingHook(defaultVale = false) {
  const [isLoading, setIsLoading] = useState(defaultVale);

  const toggleLoading = (value: boolean) => setIsLoading(value);

  return { isLoading, toggleLoading };
}
