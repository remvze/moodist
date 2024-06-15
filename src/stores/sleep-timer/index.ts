import { create } from 'zustand';

interface SleepTimerStore {
  active: boolean;
  set: (value: boolean) => void;
}

export const useSleepTimerStore = create<SleepTimerStore>()(set => ({
  active: false,
  set(value: boolean) {
    set({ active: value });
  },
}));
