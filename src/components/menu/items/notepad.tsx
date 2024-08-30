import { MdNotes } from 'react-icons/md/index';

import { Item } from '../item';

import { useNoteStore } from '@/stores/note';

export function Notepad() {
  const note = useNoteStore(state => state.note);

  return (
    <Item
      active={!!note.length}
      href="/tools/notepad"
      icon={<MdNotes />}
      label="Notepad"
    />
  );
}
