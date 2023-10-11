import type { StateCreator } from 'zustand';

import type { SoundState } from './sound.state';

import { pickMany, random } from '@/helpers/random';

export interface SoundActions {
  select: (id: string) => void;
  unselect: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  unselectAll: () => void;
  shuffle: () => void;
}

export const createActions: StateCreator<
  SoundActions & SoundState,
  [],
  [],
  SoundActions
> = (set, get) => {
  return {
    select(id) {
      set({
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
      get().unselectAll();

      const sounds = get().sounds;
      const ids = Object.keys(sounds);
      const randomIDs = pickMany(ids, 4);

      randomIDs.forEach(id => {
        sounds[id].isSelected = true;
        sounds[id].volume = random(0.2, 0.8);
      });

      set({ sounds });
    },

    unselect(id) {
      set({
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], isSelected: false },
        },
      });
    },

    unselectAll() {
      const sounds = get().sounds;
      const ids = Object.keys(sounds);

      ids.forEach(id => {
        sounds[id].isSelected = false;
        sounds[id].volume = 0.5;
      });

      set({ sounds });
    },
  };
};
