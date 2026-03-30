import { isNativePlatform } from './detect';

export async function writeToClipboard(text: string): Promise<void> {
  if (isNativePlatform()) {
    const { Clipboard } = await import('@capacitor/clipboard');
    await Clipboard.write({ string: text });
  } else {
    await navigator.clipboard.writeText(text);
  }
}

export async function readFromClipboard(): Promise<string> {
  if (isNativePlatform()) {
    const { Clipboard } = await import('@capacitor/clipboard');
    const { value } = await Clipboard.read();
    return value;
  } else {
    return navigator.clipboard.readText();
  }
}
