import { IoShareSocialSharp } from 'react-icons/io5/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

import { useSoundStore } from '@/stores/sound';

interface ShareProps {
  open: () => void;
}

export function Share({ open }: ShareProps) {
  const noSelected = useSoundStore(state => state.noSelected());
  const label = getLocalizedText('share');

  return (
    <Item
      disabled={noSelected}
      icon={<IoShareSocialSharp />}
      label={label}
      shortcut="Shift + S"
      onClick={open}
    />
  );
}
