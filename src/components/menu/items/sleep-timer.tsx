import { IoMoonSharp } from 'react-icons/io5/index';

import { Item } from '../item';

interface SleepTimerProps {
  open: () => void;
}

export function SleepTimer({ open }: SleepTimerProps) {
  return (
    <Item
      icon={<IoMoonSharp />}
      label="Sleep Timer"
      shortcut="Shift + T"
      onClick={open}
    />
  );
}
