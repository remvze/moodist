import type { StateCreator } from 'zustand';

import type { NoteActions } from './note.actions';

export interface NoteState {
  history: string | null;
  note: string;
}

export const createState: StateCreator<
  NoteState & NoteActions,
  [],
  [],
  NoteState
> = () => ({
  history: null,
  note: '',
});
