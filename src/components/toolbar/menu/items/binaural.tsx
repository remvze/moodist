import { RiPlayListFill } from 'react-icons/ri/index';

import { Item } from '../item';

interface BinauralProps {
  open: () => void;
}

export function Binaural({ open }: BinauralProps) {
  return (
    <Item icon={<RiPlayListFill />} label="Binaural Beats" onClick={open} />
  );
}
