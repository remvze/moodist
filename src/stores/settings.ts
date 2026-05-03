import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

interface SettingsStore {
  alarmVolume: number;
  globalVolume: number;
  setAlarmVolume: (volume: number) => void;
  setGlobalVolume: (volume: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    set => ({
      alarmVolume: 1,
      globalVolume: 1,

      setAlarmVolume(volume: number) {
        set({ alarmVolume: volume });
      },

      setGlobalVolume(volume: number) {
        set({ globalVolume: volume });
      },
    }),
    {
      merge: (persisted, current) =>
        merge(current, persisted as Partial<SettingsStore>),
      name: 'moodist-settings',
      partialize: state => ({
        alarmVolume: state.alarmVolume,
        globalVolume: state.globalVolume,
      }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
