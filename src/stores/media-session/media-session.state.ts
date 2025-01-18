import type { StateCreator } from 'zustand';

import type { MediaControlsActions } from './media-session.actions';

export interface MediaControlsState {
  enabled: boolean;
  isSupported: boolean;
}

export const createState: StateCreator<
  MediaControlsState & MediaControlsActions,
  [],
  [],
  MediaControlsState
> = () => ({
  enabled: false,
  isSupported: 'mediaSession' in navigator,
});
