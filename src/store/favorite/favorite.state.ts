import type { StateCreator } from 'zustand';

import type { FavoriteActions } from './favorite.actions';

export interface FavoriteState {
  favorites: Array<string>;
}

export const createState: StateCreator<
  FavoriteState & FavoriteActions,
  [],
  [],
  FavoriteState
> = () => ({ favorites: [] });
