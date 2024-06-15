import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

interface PresetStore {
  addPreset: (label: string, sounds: Record<string, number>) => void;
  changeName: (index: number, newName: string) => void;
  deletePreset: (index: number) => void;
  presets: Array<{
    label: string;
    sounds: Record<string, number>;
  }>;
}

export const usePresetStore = create<PresetStore>()(
  persist(
    (set, get) => ({
      addPreset(label: string, sounds: Record<string, number>) {
        set({ presets: [{ label, sounds }, ...get().presets] });
      },

      changeName(index: number, newName: string) {
        const presets = get().presets.map((preset, i) => {
          if (i === index) return { ...preset, label: newName };

          return preset;
        });

        set({ presets });
      },

      deletePreset(index: number) {
        set({ presets: get().presets.filter((_, i) => index !== i) });
      },

      presets: [],
    }),
    {
      merge: (persisted, current) =>
        merge(
          current,
          // @ts-ignore
          persisted,
        ),
      name: 'moodist-presets',
      partialize: state => ({ presets: state.presets }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
