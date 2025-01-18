import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

import {
  createActions,
  type MediaControlsActions,
} from './media-session.actions';
import { createState, type MediaControlsState } from './media-session.state';

export const useMediaSessionStore = create<
  MediaControlsState & MediaControlsActions
>()(
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
      name: 'moodist-media-session',
      partialize: state => ({ enabled: state.enabled }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
