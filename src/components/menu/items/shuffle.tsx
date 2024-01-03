import { BiShuffle } from 'react-icons/bi/index';

import { useSoundStore } from '@/store';

import { Item } from '../item';

export function Shuffle() {
  const shuffle = useSoundStore(state => state.shuffle);

  return <Item icon={<BiShuffle />} label="Shuffle Sounds" onClick={shuffle} />;
}
