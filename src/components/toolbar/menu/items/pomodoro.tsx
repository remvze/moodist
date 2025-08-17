import { MdOutlineAvTimer } from 'react-icons/md/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

import { usePomodoroStore } from '@/stores/pomodoro';

interface PomodoroProps {
  open: () => void;
}

export function Pomodoro({ open }: PomodoroProps) {
  const running = usePomodoroStore(state => state.running);
  const label = getLocalizedText('pomodoro');

  return (
    <Item
      active={running}
      icon={<MdOutlineAvTimer />}
      label={label}
      shortcut="Shift + P"
      onClick={open}
    />
  );
}
