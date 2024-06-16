import { create } from 'zustand';

interface AlarmStore {
  isPlaying: boolean;
  play: () => void;
  stop: () => void;
}

export const useAlarmStore = create<AlarmStore>()(set => ({
  isPlaying: false,

  play() {
    set({ isPlaying: true });
  },

  stop() {
    set({ isPlaying: false });
  },
}));
