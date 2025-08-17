import { IoMoonSharp } from 'react-icons/io5/index';

import { useSleepTimerStore } from '@/stores/sleep-timer';
import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface SleepTimerProps {
  open: () => void;
}

export function SleepTimer({ open }: SleepTimerProps) {
  const active = useSleepTimerStore(state => state.active);
  const label = getLocalizedText('sleepTimer');

  return (
    <Item
      active={active}
      icon={<IoMoonSharp />}
      label={label}
      shortcut="Shift + Alt + T"
      onClick={open}
    />
  );
}
