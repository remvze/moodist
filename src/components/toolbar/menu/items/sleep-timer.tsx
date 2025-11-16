import { IoMoonSharp } from 'react-icons/io5/index';

import { useSleepTimerStore } from '@/stores/sleep-timer';
import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface SleepTimerProps {
  open: () => void;
}

export function SleepTimer({ open }: SleepTimerProps) {
  const { t } = useTranslation();
  const active = useSleepTimerStore(state => state.active);

  return (
    <Item
      active={active}
      icon={<IoMoonSharp />}
      label={t('sleepTimer')}
      shortcut="Shift + Alt + T"
      onClick={open}
    />
  );
}
