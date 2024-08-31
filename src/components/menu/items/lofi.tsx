import { IoIosMusicalNotes } from 'react-icons/io/index';

import { Item } from '../item';

interface LofiProps {
  open: () => void;
}

export function Lofi({ open }: LofiProps) {
  return (
    <Item
      icon={<IoIosMusicalNotes />}
      label="Lofi Radios"
      shortcut="Shift + L"
      onClick={open}
    />
  );
}
