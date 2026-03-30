import { isNativePlatform } from './detect';

interface ShareOptions {
  text?: string;
  title?: string;
  url?: string;
}

export async function shareContent(options: ShareOptions): Promise<void> {
  if (isNativePlatform()) {
    const { Share } = await import('@capacitor/share');
    await Share.share({
      dialogTitle: options.title,
      text: options.text,
      title: options.title,
      url: options.url,
    });
  } else if (navigator.share) {
    await navigator.share(options);
  } else {
    // Fallback: copy to clipboard
    const content = options.url || options.text || '';
    await navigator.clipboard.writeText(content);
  }
}

export async function downloadFile(
  filename: string,
  content: string,
): Promise<void> {
  if (isNativePlatform()) {
    // On native, use share sheet instead of download
    const { Share } = await import('@capacitor/share');
    await Share.share({
      dialogTitle: `Save ${filename}`,
      text: content,
      title: filename,
    });
  } else {
    // Existing web download logic
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content),
    );
    element.setAttribute('download', filename);
    element.click();
  }
}
