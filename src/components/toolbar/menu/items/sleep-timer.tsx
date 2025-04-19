import { IoMoonSharp } from 'react-icons/io5/index';
import { useTranslation } from 'react-i18next';
import { useSleepTimerStore } from '@/stores/sleep-timer';
import { Item } from '../item';

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
      label={t('toolbar.items.sleep-timer')}
      shortcut="Shift + Alt + T"
      onClick={open}
    />
  );
}
