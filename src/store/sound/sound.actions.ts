import type { StateCreator } from 'zustand';

import type { SoundState } from './sound.state';

import { pickMany, random } from '@/helpers/random';

export interface SoundActions {
  override: (sounds: Record<string, number>) => void;
  pause: () => void;
  play: () => void;
  restoreHistory: () => void;
  select: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  shuffle: () => void;
  toggleFavorite: (id: string) => void;
  togglePlay: () => void;
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
    override(newSounds) {
      get().unselectAll();

      const sounds = get().sounds;

      Object.keys(newSounds).forEach(sound => {
        sounds[sound].isSelected = true;
        sounds[sound].volume = newSounds[sound];
      });

      set({ sounds: { ...sounds } });
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

    setVolume(id, volume) {
      set({
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], volume },
        },
      });
    },

    shuffle() {
      const sounds = get().sounds;
      const ids = Object.keys(sounds);

      ids.forEach(id => {
        sounds[id].isSelected = false;
        sounds[id].volume = 0.5;
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
      });

      set({ sounds });
    },
  };
};
