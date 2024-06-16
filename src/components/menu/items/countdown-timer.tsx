import { MdOutlineTimer } from 'react-icons/md/index';

import { Item } from '../item';

interface SleepTimerProps {
  open: () => void;
}

export function CountdownTimer({ open }: SleepTimerProps) {
  return (
    <Item
      icon={<MdOutlineTimer />}
      label="Countdown Timer"
      shortcut="Shift + T"
      onClick={open}
    />
  );
}
