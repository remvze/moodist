import { useSoundStore } from '@/store';

import { Item } from '../item';

export function Shuffle() {
  const shuffle = useSoundStore(state => state.shuffle);

  return <Item onClick={shuffle}>Shuffle Sounds</Item>;
}
