import { RiPlayListFill } from 'react-icons/ri/index';

import { Item } from '../item';

interface PresetsProps {
  open: () => void;
}

export function Presets({ open }: PresetsProps) {
  return (
    <Item
      icon={<RiPlayListFill />}
      label="Your Presets"
      shortcut="Shift + Alt + P"
      onClick={open}
    />
  );
}
