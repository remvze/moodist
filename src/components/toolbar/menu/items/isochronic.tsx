import { RiPlayListFill } from 'react-icons/ri/index';

import { Item } from '../item';

interface IsochronicProps {
  open: () => void;
}

export function Isochronic({ open }: IsochronicProps) {
  return (
    <Item icon={<RiPlayListFill />} label="Isochronic Tones" onClick={open} />
  );
}
