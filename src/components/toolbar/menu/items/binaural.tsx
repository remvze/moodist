import { FaHeadphonesAlt } from 'react-icons/fa/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface BinauralProps {
  open: () => void;
}

export function Binaural({ open }: BinauralProps) {
  const label = getLocalizedText('binaural');

  return (
    <Item icon={<FaHeadphonesAlt />} label={label} onClick={open} />
  );
}
