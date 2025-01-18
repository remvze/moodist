import type { StateCreator } from 'zustand';
import type { MediaControlsState } from './media-session.state';

export interface MediaControlsActions {
  disable: () => void;
  enable: () => void;
  toggle: () => void;
}

export const createActions: StateCreator<
  MediaControlsActions & MediaControlsState,
  [],
  [],
  MediaControlsActions
> = (set, get) => {
  return {
    disable() {
      set({ enabled: false });
    },

    enable() {
      set({ enabled: true });
    },

    toggle() {
      set({ enabled: !get().enabled });
    },
  };
};
