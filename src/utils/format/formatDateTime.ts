/**
 * @name formatDateTime
 * @function
 * @description format date and time
 *
 * @param dateString date string
 */
export function formatDateTime(dateString: string, showSeconds = false) {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
  };
  const date = new Date(dateString).toLocaleDateString(undefined, optionsDate);
  const time = new Date(dateString).toLocaleTimeString(undefined, optionsTime);
  if (!date || !time) {
    return "Invalid date";
  }
  return `${date} - ${time}`;
}
