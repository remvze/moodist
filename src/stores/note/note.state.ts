import type { StateCreator } from 'zustand';

import type { NoteActions } from './note.actions';
import { count } from '@/helpers/counter';

export interface NoteState {
  characters: () => number;
  history: string | null;
  note: string;
  words: () => number;
}

export const createState: StateCreator<
  NoteState & NoteActions,
  [],
  [],
  NoteState
> = (set, get) => ({
  characters() {
    return count(get().note).characters;
  },
  history: null,
  note: '',
  words() {
    return count(get().note).words;
  },
});
