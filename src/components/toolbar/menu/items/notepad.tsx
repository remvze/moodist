import { MdNotes } from 'react-icons/md/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

import { useNoteStore } from '@/stores/note';

interface NotepadProps {
  open: () => void;
}

export function Notepad({ open }: NotepadProps) {
  const note = useNoteStore(state => state.note);
  const label = getLocalizedText('notepad');

  return (
    <Item
      active={!!note.length}
      icon={<MdNotes />}
      label={label}
      shortcut="Shift + N"
      onClick={open}
    />
  );
}
