import type { StateCreator } from 'zustand';

import type { FavoriteState } from './favorite.state';

export interface FavoriteActions {
  toggleFavorite: (id: string) => void;
}

export const createActions: StateCreator<
  FavoriteActions & FavoriteState,
  [],
  [],
  FavoriteActions
> = (set, get) => {
  return {
    toggleFavorite(id) {
      if (get().favorites.includes(id)) {
        set({ favorites: get().favorites.filter(_id => _id !== id) });
      } else {
        set({ favorites: [...get().favorites, id] });
      }
    },
  };
};
