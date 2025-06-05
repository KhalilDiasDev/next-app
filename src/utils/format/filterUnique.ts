/**
 * @name filterUnique
 * @description This function filters an array to remove duplicate elements and returns the filtered array.
 * @param array: An array of elements of type T from which duplicates are to be removed.
 * @returns An array of elements of type T with duplicate elements removed.
 */
export default function filterUnique<T>(array: T[]): T[] {
  return array.filter((value, index, arr) => arr.indexOf(value) === index);
}
