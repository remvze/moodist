import { FaHeadphonesAlt } from 'react-icons/fa/index';

import { Item } from '../item';
import { isNativePlatform } from '@/lib/platform';

interface BinauralProps {
  open: () => void;
}

export function Binaural({ open }: BinauralProps) {
  const isNative = isNativePlatform();

  return (
    <Item
      badge={isNative ? 'Foreground' : undefined}
      icon={<FaHeadphonesAlt />}
      label="Binaural Beats"
      onClick={open}
    />
  );
}
