import { TbWaveSine } from 'react-icons/tb/index';

import { Item } from '../item';

interface IsochronicProps {
  open: () => void;
}

export function Isochronic({ open }: IsochronicProps) {
  return <Item icon={<TbWaveSine />} label="Isochronic Tones" onClick={open} />;
}
