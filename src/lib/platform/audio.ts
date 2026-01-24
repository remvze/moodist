import { isNativePlatform, isIOS } from './detect';

interface AudioSession {
  type: string;
}

interface NavigatorWithAudioSession extends Navigator {
  audioSession?: AudioSession;
}

export async function configureAudioSession(): Promise<void> {
  if (isNativePlatform() && isIOS()) {
    // iOS WebView audio session is configured via native code
    // This function serves as a hook point for future native plugin integration
    console.log('[Audio] iOS native audio session');
  } else if (typeof window !== 'undefined' && 'navigator' in window) {
    // Web Audio Session API (experimental)
    const nav = window.navigator as NavigatorWithAudioSession;
    if (nav.audioSession) {
      nav.audioSession.type = 'playback';
    }
  }
}

export function supportsMediaSession(): boolean {
  if (isNativePlatform() && isIOS()) {
    // iOS WebView has limited MediaSession support
    // Return false to skip web MediaSession API
    return false;
  }
  return 'mediaSession' in navigator;
}
