import { TbWaveSine } from 'react-icons/tb/index';

import { Item } from '../item';
import { isNativePlatform } from '@/lib/platform';

interface IsochronicProps {
  open: () => void;
}

export function Isochronic({ open }: IsochronicProps) {
  const isNative = isNativePlatform();

  return (
    <Item
      badge={isNative ? 'Foreground' : undefined}
      icon={<TbWaveSine />}
      label="Isochronic Tones"
      onClick={open}
    />
  );
}
