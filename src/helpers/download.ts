/**
 * Triggers a download of a file with the specified filename and content.
 *
 * @param {string} filename - The name of the file to be downloaded.
 * @param {string} content - The content to be included in the downloaded file.
 */
export function download(filename: string, content: string) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(content),
  );
  element.setAttribute('download', filename);
  element.click();
}
