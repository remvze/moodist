import { MdOutlineAvTimer } from 'react-icons/md/index';

import { Item } from '../item';

import { usePomodoroStore } from '@/stores/pomodoro';
import { useTranslation } from '@/hooks/useTranslation';

interface PomodoroProps {
  open: () => void;
}

export function Pomodoro({ open }: PomodoroProps) {
  const { t } = useTranslation();
  const running = usePomodoroStore(state => state.running);

  return (
    <Item
      active={running}
      icon={<MdOutlineAvTimer />}
      label={t('pomodoro')}
      shortcut="Shift + P"
      onClick={open}
    />
  );
}
