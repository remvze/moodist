import { TbWaveSine } from 'react-icons/tb/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface IsochronicProps {
  open: () => void;
}

export function Isochronic({ open }: IsochronicProps) {
  const label = getLocalizedText('isochronic');

  return <Item icon={<TbWaveSine />} label={label} onClick={open} />;
}
