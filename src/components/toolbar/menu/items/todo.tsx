import { MdTaskAlt } from 'react-icons/md/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface TodoProps {
  open: () => void;
}

export function Todo({ open }: TodoProps) {
  const label = getLocalizedText('todo');

  return (
    <Item
      icon={<MdTaskAlt />}
      label={label}
      shortcut="Shift + T"
      onClick={open}
    />
  );
}
