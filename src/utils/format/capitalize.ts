/**
 * @name capitalize
 * @description Capitalizes the first letter of a given string.
 * @param string The string to capitalize.
 * @returns The capitalized string. Returns undefined if input is undefined.
 */
export function capitalize(string?: string) {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : string;
}
