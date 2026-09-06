import { getAssetPath } from '@/helpers/path';

/** Number of crack-N.mp3 / tail-N.mp3 pairs available under /sounds/rain/thunder/ */
const SAMPLE_COUNT = 12;

export const CRACK_FILES = Array.from({ length: SAMPLE_COUNT }, (_, i) =>
  getAssetPath(`/sounds/rain/thunder/crack-${i + 1}.mp3`),
);

export const TAIL_FILES = Array.from({ length: SAMPLE_COUNT }, (_, i) =>
  getAssetPath(`/sounds/rain/thunder/tail-${i + 1}.mp3`),
);

/**
 * Tunable generator parameters. Single source of truth so a future settings
 * modal (mirroring the Binaural/Isochronic menu item + modal pattern) can
 * read/override these without touching the scheduling logic in useThunder.
 */
export const THUNDER_CONFIG = {
  /** Seconds of overlap between a crack's fade-out and its paired tail's fade-in */
  crossfadeOverlap: 0.3,
  /** How much a second, quieter clap can trail the first (storm feels busier) */
  doubleClap: {
    chance: 0.15,
    delayRange: [0.4, 2.5] as const,
    gainRange: [0.4, 0.7] as const,
  },
  /** 0 = always close/sharp, 1 = always far/muffled; actual distance jitters ±0.35 around this */
  farBias: 0.5,
  /** Randomized seconds between claps while playing */
  gapRange: [6, 25] as const,
  /** ± playback-rate variation applied per clap, before the distance-based pitch drop */
  rateJitter: 0.12,
};
