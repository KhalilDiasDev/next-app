/**
 * @name hideValue
 * @description Hide the value of a text
 * @param value The text to be hidden
 * @returns The formatted message with the value hidden
 */
export function hideValue(value: string) {
  if (typeof value === "string" && value.length > 1) {
    return value[0] + "*".repeat(value.length - 1);
  }
  return value;
}
