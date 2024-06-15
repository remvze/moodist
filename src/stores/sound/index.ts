import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

import { type SoundState, createState } from './sound.state';
import { type SoundActions, createActions } from './sound.actions';

export const useSoundStore = create<SoundState & SoundActions>()(
  persist(
    (...a) => ({
      ...createState(...a),
      ...createActions(...a),
    }),
    {
      merge: (persisted, current) =>
        merge(
          current,
          // @ts-ignore
          persisted,
        ),
      name: 'moodist-sounds',
      partialize: state => ({ sounds: state.sounds }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
