import { NativeAudio } from '@capgo/native-audio';
import { isNativePlatform } from '@/lib/platform';

interface SoundState {
  isLoaded: boolean;
  isPlaying: boolean;
  volume: number;
}

class NativeAudioService {
  private static instance: NativeAudioService;
  private sounds: Map<string, SoundState> = new Map();
  private initialized = false;

  private constructor() {}

  static getInstance(): NativeAudioService {
    if (!NativeAudioService.instance) {
      NativeAudioService.instance = new NativeAudioService();
    }
    return NativeAudioService.instance;
  }

  private async initialize(): Promise<void> {
    if (this.initialized || !isNativePlatform()) return;
    this.initialized = true;

    try {
      await NativeAudio.configure({
        fade: false,
        focus: false,
      });
    } catch (error) {
      console.error('[NativeAudio] Failed to initialize:', error);
    }
  }

  private getAssetPath(src: string): string {
    const cleanPath = src.startsWith('/') ? src.slice(1) : src;
    return `public/${cleanPath}`;
  }

  private getAssetId(src: string): string {
    return src
      .replace(/^\//, '')
      .replace(/\//g, '_')
      .replace(/\.mp3$/, '');
  }

  async preload(src: string): Promise<boolean> {
    if (!isNativePlatform()) return false;

    await this.initialize();

    const assetId = this.getAssetId(src);
    const state = this.sounds.get(src);

    if (state?.isLoaded) {
      return true;
    }

    try {
      await NativeAudio.preload({
        assetId,
        assetPath: this.getAssetPath(src),
        audioChannelNum: 1,
        isUrl: false,
      });

      this.sounds.set(src, { isLoaded: true, isPlaying: false, volume: 0.5 });
      return true;
    } catch (error: unknown) {
      // Handle "already loaded" - plugin may have it cached
      const errMsg =
        error instanceof Error
          ? error.message
          : String((error as { message?: string })?.message || error);

      if (errMsg.includes('already loaded')) {
        this.sounds.set(src, { isLoaded: true, isPlaying: false, volume: 0.5 });
        return true;
      }
      console.error(`[NativeAudio] Failed to preload ${src}:`, error);
      return false;
    }
  }

  async play(src: string, loop: boolean = false): Promise<boolean> {
    if (!isNativePlatform()) return false;

    const assetId = this.getAssetId(src);
    let state = this.sounds.get(src);

    if (!state?.isLoaded) {
      const loaded = await this.preload(src);
      if (!loaded) return false;
      state = this.sounds.get(src)!;
    }

    if (state.isPlaying) return true;

    try {
      if (loop) {
        await NativeAudio.loop({ assetId });
      }
      await NativeAudio.play({ assetId, time: 0 });
      state.isPlaying = true;
      return true;
    } catch (error) {
      console.error(`[NativeAudio] Failed to play ${src}:`, error);
      return false;
    }
  }

  async stop(src: string): Promise<void> {
    if (!isNativePlatform()) return;

    const state = this.sounds.get(src);
    if (!state?.isLoaded || !state.isPlaying) return;

    try {
      await NativeAudio.stop({ assetId: this.getAssetId(src) });
      state.isPlaying = false;
    } catch (error) {
      console.error(`[NativeAudio] Failed to stop ${src}:`, error);
    }
  }

  async pause(src: string): Promise<void> {
    if (!isNativePlatform()) return;

    const state = this.sounds.get(src);
    if (!state?.isLoaded || !state.isPlaying) return;

    try {
      await NativeAudio.pause({ assetId: this.getAssetId(src) });
      state.isPlaying = false;
    } catch (error) {
      console.error(`[NativeAudio] Failed to pause ${src}:`, error);
    }
  }

  async resume(src: string): Promise<void> {
    if (!isNativePlatform()) return;

    const state = this.sounds.get(src);
    if (!state?.isLoaded) return;

    try {
      await NativeAudio.resume({ assetId: this.getAssetId(src) });
      state.isPlaying = true;
    } catch (error) {
      console.error(`[NativeAudio] Failed to resume ${src}:`, error);
    }
  }

  async setVolume(src: string, volume: number): Promise<void> {
    if (!isNativePlatform()) return;

    const state = this.sounds.get(src);
    if (!state?.isLoaded) return;

    try {
      await NativeAudio.setVolume({
        assetId: this.getAssetId(src),
        volume: Math.max(0, Math.min(1, volume)),
      });
      state.volume = volume;
    } catch (error) {
      console.error(`[NativeAudio] Failed to set volume for ${src}:`, error);
    }
  }

  async unload(src: string): Promise<void> {
    if (!isNativePlatform()) return;

    const state = this.sounds.get(src);
    if (!state?.isLoaded) return;

    try {
      await NativeAudio.unload({ assetId: this.getAssetId(src) });
      this.sounds.delete(src);
    } catch (error) {
      console.error(`[NativeAudio] Failed to unload ${src}:`, error);
    }
  }

  isPlaying(src: string): boolean {
    return this.sounds.get(src)?.isPlaying ?? false;
  }

  isLoaded(src: string): boolean {
    return this.sounds.get(src)?.isLoaded ?? false;
  }
}

export const nativeAudio = NativeAudioService.getInstance();
