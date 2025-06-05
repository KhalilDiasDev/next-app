/**
 *
 * @param formatName
 * @function
 *
 * @description returns a string formatted without spaces
 */
export function formatName(name: string) {
  return name.toLowerCase().replaceAll(" ", "-");
}
