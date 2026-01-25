import { isNativePlatform, isIOS } from './detect';

interface AudioSession {
  type: string;
}

interface NavigatorWithAudioSession extends Navigator {
  audioSession?: AudioSession;
}

let audioSessionConfigured = false;

export async function configureAudioSession(): Promise<void> {
  if (audioSessionConfigured) return;
  audioSessionConfigured = true;

  if (isNativePlatform() && isIOS()) {
    // iOS WebView audio session is configured via native code
    // No action needed - handled by AppDelegate.swift
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
