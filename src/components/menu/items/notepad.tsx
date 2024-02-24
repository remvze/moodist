import { MdNotes } from 'react-icons/md/index';

import { Item } from '../item';

interface NotepadProps {
  open: () => void;
}

export function Notepad({ open }: NotepadProps) {
  return <Item icon={<MdNotes />} label="Notepad" onClick={open} />;
}
