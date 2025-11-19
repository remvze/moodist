import type { StateCreator } from 'zustand';

import type { SoundState } from './sound.state';

import { pickMany, random } from '@/helpers/random';

export interface SoundActions {
  lock: () => void;
  override: (sounds: Record<string, number>) => void;
  pause: () => void;
  play: () => void;
  restoreHistory: () => void;
  select: (id: string) => void;
  setGlobalVolume: (volume: number) => void;
  setVolume: (id: string, volume: number) => void;
  setSpeed: (id: string, speed: number) => void;
  setRate: (id: string, rate: number) => void;
  toggleRandomSpeed: (id: string) => void;
  toggleRandomVolume: (id: string) => void;
  toggleRandomRate: (id: string) => void;
  toggleAllRandom: (id: string) => void;
  shuffle: () => void;
  toggleFavorite: (id: string) => void;
  togglePlay: () => void;
  unlock: () => void;
  unselect: (id: string) => void;
  unselectAll: (pushToHistory?: boolean) => void;
}

export const createActions: StateCreator<
  SoundActions & SoundState,
  [],
  [],
  SoundActions
> = (set, get) => {
  return {
    lock() {
      set({ locked: true });
    },

    override(newSounds) {
      get().unselectAll();

      const sounds = get().sounds;

      Object.keys(newSounds).forEach(sound => {
        if (sounds[sound]) {
          sounds[sound].isSelected = true;
          sounds[sound].volume = newSounds[sound];
        }
      });

      set({ history: null, sounds: { ...sounds } });
    },

    pause() {
      set({ isPlaying: false });
    },

    play() {
      set({ isPlaying: true });
    },

    restoreHistory() {
      const history = get().history;

      if (!history) return;

      set({ history: null, sounds: history });
    },

    select(id) {
      set({
        history: null,
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], isSelected: true },
        },
      });
    },

    setGlobalVolume(volume) {
      set({
        globalVolume: volume,
      });
    },

    setVolume(id, volume) {
      set({
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], volume },
        },
      });
    },

    setSpeed(id, speed) {
      set({
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], speed },
        },
      });
    },

    setRate(id, rate) {
      set({
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], rate },
        },
      });
    },

    toggleRandomSpeed(id) {
      const currentSound = get().sounds[id];
      const isRandomSpeed = !currentSound.isRandomSpeed;

      set({
        sounds: {
          ...get().sounds,
          [id]: { ...currentSound, isRandomSpeed },
        },
      });
    },

    toggleRandomVolume(id) {
      const currentSound = get().sounds[id];
      const isRandomVolume = !currentSound.isRandomVolume;

      set({
        sounds: {
          ...get().sounds,
          [id]: { ...currentSound, isRandomVolume },
        },
      });
    },

    toggleRandomRate(id) {
      const currentSound = get().sounds[id];
      const isRandomRate = !currentSound.isRandomRate;

      set({
        sounds: {
          ...get().sounds,
          [id]: { ...currentSound, isRandomRate },
        },
      });
    },

    toggleAllRandom(id) {
      const currentSound = get().sounds[id];
      const hasAnyRandom = currentSound.isRandomSpeed || currentSound.isRandomVolume || currentSound.isRandomRate;
      const newState = !hasAnyRandom;

      set({
        sounds: {
          ...get().sounds,
          [id]: {
            ...currentSound,
            isRandomSpeed: newState,
            isRandomVolume: newState,
            isRandomRate: newState
          },
        },
      });
    },

    shuffle() {
      const sounds = get().sounds;
      const ids = Object.keys(sounds);

      ids.forEach(id => {
        sounds[id].isSelected = false;
        sounds[id].volume = 0.5;
        sounds[id].speed = 1.0;
        sounds[id].rate = 1.0;
        sounds[id].isRandomSpeed = false;
        sounds[id].isRandomVolume = false;
        sounds[id].isRandomRate = false;
      });

      const randomIDs = pickMany(ids, 4);

      randomIDs.forEach(id => {
        sounds[id].isSelected = true;
        sounds[id].volume = random(0.2, 1);
      });

      set({ history: null, isPlaying: true, sounds });
    },

    toggleFavorite(id) {
      const sounds = get().sounds;
      const sound = sounds[id];

      set({
        history: null,
        sounds: {
          ...sounds,
          [id]: { ...sound, isFavorite: !sound.isFavorite },
        },
      });
    },

    togglePlay() {
      set({ isPlaying: !get().isPlaying });
    },

    unlock() {
      set({ locked: false });
    },

    unselect(id) {
      set({
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], isSelected: false },
        },
      });
    },

    unselectAll(pushToHistory = false) {
      const noSelected = get().noSelected();

      if (noSelected) return;

      const sounds = get().sounds;

      if (pushToHistory) {
        const history = JSON.parse(JSON.stringify(sounds));
        set({ history });
      }

      const ids = Object.keys(sounds);

      ids.forEach(id => {
        sounds[id].isSelected = false;
        sounds[id].volume = 0.5;
        sounds[id].speed = 1.0;
        sounds[id].rate = 1.0;
        sounds[id].isRandomSpeed = false;
        sounds[id].isRandomVolume = false;
        sounds[id].isRandomRate = false;
      });

      set({ sounds });
    },
  };
};
