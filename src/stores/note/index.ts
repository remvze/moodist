import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';

import { type NoteState, createState } from './note.state';
import { type NoteActions, createActions } from './note.actions';

export const useNoteStore = create<NoteState & NoteActions>()(
  persist(
    (...a) => ({
      ...createState(...a),
      ...createActions(...a),
    }),
    {
      merge: (persisted, current) =>
        merge(
          current,
          // @ts-ignore
          persisted,
        ),
      name: 'moodist-note',
      partialize: state => ({ note: state.note }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
