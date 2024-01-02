import { useSoundStore } from '@/store';

import { Button } from './button';

export function ShuffleButton() {
  const shuffle = useSoundStore(state => state.shuffle);

  return <Button onClick={shuffle}>Shuffle Sounds</Button>;
}
