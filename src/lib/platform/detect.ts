interface CapacitorGlobal {
  getPlatform?: () => 'ios' | 'android' | 'web';
  isNativePlatform?: () => boolean;
}

declare global {
  interface Window {
    Capacitor?: CapacitorGlobal;
  }
}

let _isNative: boolean | null = null;
let _platform: 'ios' | 'android' | 'web' = 'web';

export function isNativePlatform(): boolean {
  if (_isNative !== null) return _isNative;

  try {
    // Dynamic import check - Capacitor sets this on native
    const Capacitor = window.Capacitor;
    _isNative = Capacitor?.isNativePlatform?.() ?? false;
    _platform = Capacitor?.getPlatform?.() ?? 'web';
  } catch {
    _isNative = false;
  }

  return _isNative;
}

export function getPlatform(): 'ios' | 'android' | 'web' {
  isNativePlatform(); // Ensure initialized
  return _platform;
}

export function isIOS(): boolean {
  return getPlatform() === 'ios';
}
