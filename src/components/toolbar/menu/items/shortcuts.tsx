import { MdKeyboardCommandKey } from 'react-icons/md/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface ShortcutsProps {
  open: () => void;
}

export function Shortcuts({ open }: ShortcutsProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<MdKeyboardCommandKey />}
      label={t('shortcuts')}
      shortcut="Shift + H"
      onClick={open}
    />
  );
}
