import { MdOutlineTimer } from 'react-icons/md/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

interface CountdownProps {
  open: () => void;
}

export function Countdown({ open }: CountdownProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<MdOutlineTimer />}
      label={t('toolbar.items.countdown')}
      shortcut="Shift + C"
      onClick={open}
    />
  );
}
