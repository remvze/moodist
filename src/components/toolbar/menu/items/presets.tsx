import { RiPlayListFill } from 'react-icons/ri/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface PresetsProps {
  open: () => void;
}

export function Presets({ open }: PresetsProps) {
  const label = getLocalizedText('presets');

  return (
    <Item
      icon={<RiPlayListFill />}
      label={label}
      shortcut="Shift + Alt + P"
      onClick={open}
    />
  );
}
