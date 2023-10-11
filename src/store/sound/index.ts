import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type SoundState, createState } from './sound.state';
import { type SoundActions, createActions } from './sound.actions';

export const useSoundStore = create<SoundState & SoundActions>()(
  persist(
    (...a) => ({
      ...createState(...a),
      ...createActions(...a),
    }),
    {
      name: 'moodist-sounds',
      partialize: state => ({ sounds: state.sounds }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
