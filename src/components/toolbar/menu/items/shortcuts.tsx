import { MdKeyboardCommandKey } from 'react-icons/md/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface ShortcutsProps {
  open: () => void;
}

export function Shortcuts({ open }: ShortcutsProps) {
  const label = getLocalizedText('shortcuts');

  return (
    <Item
      icon={<MdKeyboardCommandKey />}
      label={label}
      shortcut="Shift + H"
      onClick={open}
    />
  );
}
