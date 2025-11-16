import { MdOutlineTimer } from 'react-icons/md/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface CountdownProps {
  open: () => void;
}

export function Countdown({ open }: CountdownProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<MdOutlineTimer />}
      label={t('countdownTimer')}
      shortcut="Shift + C"
      onClick={open}
    />
  );
}
