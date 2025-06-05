/**
 * @name formatError
 * @description This function formats the error message to be displayed in the UI.
 * @param error Response error object
 * @returns an error message string
 */
export default function formatError(error: any) {
  return (
    error?.response?.data?.error ||
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    "unexpected error"
  );
}
