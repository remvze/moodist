import { create } from 'zustand';

interface PomodoroStore {
  running: boolean;
  setRunning: (value: boolean) => void;
}

export const usePomodoroStore = create<PomodoroStore>()(set => ({
  running: false,
  setRunning(value: boolean) {
    set({ running: value });
  },
}));
