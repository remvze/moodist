import type { StateCreator } from 'zustand';

import type { NoteState } from './note.state';

export interface NoteActions {
  clear: () => void;
  restore: () => void;
  write: (note: string) => void;
}

export const createActions: StateCreator<
  NoteActions & NoteState,
  [],
  [],
  NoteActions
> = (set, get) => {
  return {
    clear() {
      if (!get().note) return;

      set({ history: get().note, note: '' });
    },

    restore() {
      if (!get().history) return;

      set({ history: null, note: get().history! });
    },

    write(note) {
      set({ history: null, note });
    },
  };
};
