import type { StateCreator } from 'zustand';

import type { NoteState } from './note.state';

export interface NoteActions {
  write: (note: string) => void;
}

export const createActions: StateCreator<
  NoteActions & NoteState,
  [],
  [],
  NoteActions
> = set => {
  return {
    write(note) {
      set({ note });
    },
  };
};
