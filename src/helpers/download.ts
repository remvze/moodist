import { downloadFile } from '@/lib/platform';

/**
 * Triggers a download of a file with the specified filename and content.
 *
 * @param {string} filename - The name of the file to be downloaded.
 * @param {string} content - The content to be included in the downloaded file.
 */
export async function download(filename: string, content: string) {
  await downloadFile(filename, content);
}
