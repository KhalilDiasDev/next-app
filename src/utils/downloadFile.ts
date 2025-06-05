export function downloadFile(
  body: any,
  fileName: string,
  type = "application/json"
) {
  const blob = new Blob([body], {
    type: type,
  }); // Create a Blob object with the JSON
  const url = window.URL.createObjectURL(blob); // Create a URL that points to the Blob
  const link = document.createElement("a"); // Create an <a> element
  link.href = url; // Set the href attribute of the <a> element to the URL
  link.download = fileName; // Set the download attribute of the <a> element to the file name
  link.click(); // Simulate a click on the <a> element to initiate the download
}
