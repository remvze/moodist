export class BrowserDetect {
  private static _isSafari: boolean | undefined;

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
}
