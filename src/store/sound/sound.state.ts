import type { StateCreator } from 'zustand';

import type { SoundActions } from './sound.actions';

import { sounds } from '@/data/sounds';

export interface SoundState {
  isPlaying: boolean;
  sounds: {
    [id: string]: {
      isSelected: boolean;
      isFavorite: boolean;
      volume: number;
    };
  };
  history: {
    [id: string]: {
      isSelected: boolean;
      isFavorite: boolean;
      volume: number;
    };
  } | null;
  noSelected: () => boolean;
  getFavorites: () => Array<string>;
}

export const createState: StateCreator<
  SoundState & SoundActions,
  [],
  [],
  SoundState
> = (set, get) => {
  const state: SoundState = {
    getFavorites() {
      const { sounds } = get();
      const ids = Object.keys(sounds);
      const favorites = ids.filter(id => sounds[id].isFavorite);

      return favorites;
    },
    history: null,
    isPlaying: false,
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
        isFavorite: false,
        isSelected: false,
        volume: 0.5,
      };
    });
  });

  return state;
};
