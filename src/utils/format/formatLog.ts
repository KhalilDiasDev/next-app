/**
 * @name formatLog
 * @description Formats a message for logging by adding the current time.
 * @param {string} message The message to be formatted.
 * @returns {string} The formatted message with the current time added.
 */
export function formatLog(message: string): string {
  const currentDate = new Date().toISOString().split("T");
  const formattedTime = currentDate[1].split(".")[0];

  return `[${currentDate[0]} - ${formattedTime}]: ${message}`;
}

/**
 * @name sectionLogTitle
 * @description Generates a section title for logging.
 * @param {string} message The message to be included in the section title.
 * @returns {string} The section title.
 */
export function sectionLogTitle(message: string): string {
  return `==================== ${message} ====================`;
}
