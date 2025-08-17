import { MdOutlineTimer } from 'react-icons/md/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface CountdownProps {
  open: () => void;
}

export function Countdown({ open }: CountdownProps) {
  const label = getLocalizedText('countdown');

  return (
    <Item
      icon={<MdOutlineTimer />}
      label={label}
      shortcut="Shift + C"
      onClick={open}
    />
  );
}
