import { MdOutlineAvTimer } from 'react-icons/md/index';

import { Item } from '../item';

interface PomodoroProps {
  open: () => void;
}

export function Pomodoro({ open }: PomodoroProps) {
  return <Item icon={<MdOutlineAvTimer />} label="Pomodoro" onClick={open} />;
}
