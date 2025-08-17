import { BiShuffle } from 'react-icons/bi/index';

import { useSoundStore } from '@/stores/sound';
import { getLocalizedText } from '@/utils/language';

import { Item } from '../item';

export function Shuffle() {
  const shuffle = useSoundStore(state => state.shuffle);
  const locked = useSoundStore(state => state.locked);
  const label = getLocalizedText('shuffle');

  return (
    <Item
      disabled={locked}
      icon={<BiShuffle />}
      label={label}
      onClick={shuffle}
    />
  );
}
