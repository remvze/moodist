import { IoIosMusicalNote } from 'react-icons/io/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface LofiProps {
  open: () => void;
}

export function Lofi({ open }: LofiProps) {
  const label = getLocalizedText('lofi');

  return (
    <Item
      icon={<IoIosMusicalNote />}
      label={label}
      onClick={open}
    />
  );
}
