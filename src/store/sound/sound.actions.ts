import type { StateCreator } from 'zustand';

import type { SoundState } from './sound.state';

export interface SoundActions {
  select: (id: string) => void;
  unselect: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
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

    unselect(id) {
      set({
        sounds: {
          ...get().sounds,
          [id]: { ...get().sounds[id], isSelected: false },
        },
      });
    },
  };
};
