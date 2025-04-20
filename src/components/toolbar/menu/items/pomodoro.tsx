import { MdOutlineAvTimer } from 'react-icons/md/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';
import { usePomodoroStore } from '@/stores/pomodoro';

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
      label={t('toolbar.items.pomodoro')}
      shortcut="Shift + P"
      onClick={open}
    />
  );
}
