import type { StateCreator } from 'zustand';

import type { SoundActions } from './sound.actions';

import { sounds } from '@/data/sounds';

export interface SoundState {
  sounds: {
    [id: string]: {
      isSelected: boolean;
      volume: number;
    };
  };
  noSelected: () => boolean;
}

export const createState: StateCreator<
  SoundState & SoundActions,
  [],
  [],
  SoundState
> = (set, get) => {
  const state: SoundState = {
    noSelected() {
      const { sounds } = get();
      const keys = Object.keys(sounds);

      return keys.every(key => !sounds[key].isSelected);
    },

    sounds: {},
  };

  const { categories } = sounds;

  categories.forEach(category => {
    const { sounds } = category;

    sounds.forEach(sound => {
      state.sounds[sound.id] = {
        isSelected: false,
        volume: 0.5,
      };
    });
  });

  return state;
};
