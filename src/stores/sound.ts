import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

import { sounds as soundCategories } from '@/data/sounds';
import { pickMany, random } from '@/helpers/random';

type SoundValue = {
  isFavorite: boolean;
  isOscillating: boolean;
  isSelected: boolean;
  volume: number;
};

type SoundHistory = {
  isPlaying: boolean;
  sounds: Record<string, SoundValue>;
};

interface SoundStore {
  getFavorites: () => Array<string>;
  history: SoundHistory | null;
  isPlaying: boolean;
  lock: () => void;
  locked: boolean;
  noSelected: () => boolean;
  override: (sounds: Record<string, number>, pushToHistory?: boolean) => void;
  pause: () => void;
  play: () => void;
  restoreHistory: () => void;
  select: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  shuffle: () => void;
  sounds: Record<string, SoundValue>;
  toggleFavorite: (id: string) => void;
  toggleOscillation: (id: string) => void;
  togglePlay: () => void;
  unlock: () => void;
  unselect: (id: string) => void;
  unselectAll: (pushToHistory?: boolean) => void;
}

function createInitialSounds() {
  const initialSounds: Record<string, SoundValue> = {};

  soundCategories.categories.forEach(category => {
    category.sounds.forEach(sound => {
      initialSounds[sound.id] = {
        isFavorite: false,
        isOscillating: false,
        isSelected: false,
        volume: 0.5,
      };
    });
  });

  return initialSounds;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      getFavorites() {
        const { sounds } = get();
        const ids = Object.keys(sounds);
        const favorites = ids.filter(id => sounds[id].isFavorite);

        return favorites;
      },

      history: null,
      isPlaying: false,

      lock() {
        set({ locked: true });
      },

      locked: false,

      noSelected() {
        const { sounds } = get();
        const keys = Object.keys(sounds);

        return keys.every(key => !sounds[key].isSelected);
      },

      override(newSounds, pushToHistory = false) {
        const previous = get();
        const sounds = Object.fromEntries(
          Object.entries(previous.sounds).map(([id, sound]) => [
            id,
            {
              ...sound,
              isSelected: id in newSounds,
              volume: id in newSounds ? newSounds[id] : 0.5,
            },
          ]),
        );

        set({
          history:
            pushToHistory && !previous.noSelected()
              ? { isPlaying: previous.isPlaying, sounds: previous.sounds }
              : null,
          sounds,
        });
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

        set({
          history: null,
          isPlaying: history.isPlaying,
          sounds: history.sounds,
        });
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

      sounds: createInitialSounds(),

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

      toggleOscillation(id) {
        const sounds = get().sounds;
        const sound = sounds[id];

        set({
          sounds: {
            ...sounds,
            [id]: { ...sound, isOscillating: !sound.isOscillating },
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
          const history = {
            isPlaying: get().isPlaying,
            sounds: structuredClone(sounds),
          };
          set({ history });
        }

        const ids = Object.keys(sounds);

        ids.forEach(id => {
          sounds[id].isSelected = false;
          sounds[id].volume = 0.5;
        });

        set({ sounds });
      },
    }),
    {
      merge: (persisted, current) =>
        merge(
          current,
          // @ts-expect-error
          persisted,
        ),
      name: 'moodist-sounds',
      partialize: state => ({
        sounds: state.sounds,
      }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
