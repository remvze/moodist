import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type FavoriteState, createState } from './favorite.state';
import { type FavoriteActions, createActions } from './favorite.actions';

export const useFavoriteStore = create<FavoriteState & FavoriteActions>()(
  persist(
    (...a) => ({
      ...createState(...a),
      ...createActions(...a),
    }),
    {
      name: 'moodist-favorites',
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
