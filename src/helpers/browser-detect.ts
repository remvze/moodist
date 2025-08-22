export class BrowserDetect {
  private static _isSafari: boolean | undefined;
  private static _isIOS: boolean | undefined;

  public static isSafari(): boolean {
    if (typeof BrowserDetect._isSafari !== 'undefined') {
      return BrowserDetect._isSafari;
    }
    
    // Source: https://github.com/goldfire/howler.js/blob/v2.2.4/src/howler.core.js#L270
    BrowserDetect._isSafari =
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('Chrome') === -1;

    return BrowserDetect._isSafari;
  }

  /** True on iPhone/iPad/iPod (covers iPadOS-on-Mac UA quirk). */
  public static isIOS(): boolean {
    if (typeof BrowserDetect._isIOS !== 'undefined') return BrowserDetect._isIOS;
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    const touchMac = /\bMacintosh\b/.test(ua) && 'ontouchend' in (window as any);
    BrowserDetect._isIOS = /\b(iPad|iPhone|iPod)\b/i.test(ua) || touchMac;
    return BrowserDetect._isIOS;
  }
}
