import { MdKeyboardCommandKey } from 'react-icons/md/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

interface ShortcutsProps {
  open: () => void;
}

export function Shortcuts({ open }: ShortcutsProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<MdKeyboardCommandKey />}
      label={t('toolbar.items.shortcuts')}
      shortcut="Shift + H"
      onClick={open}
    />
  );
}
