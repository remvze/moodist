import { LuRadioTower } from 'react-icons/lu/index';

import { Item } from '../item';

interface RadioProps {
  active: boolean;
  open: () => void;
}

export function Radio({ active, open }: RadioProps) {
  return (
    <Item
      active={active}
      icon={<LuRadioTower />}
      label="Music Radio"
      onClick={open}
    />
  );
}
