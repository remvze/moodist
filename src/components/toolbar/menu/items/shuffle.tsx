import { BiShuffle } from 'react-icons/bi/index';

import { useSoundStore } from '@/stores/sound';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

export function Shuffle() {
  const { t } = useTranslation();
  const shuffle = useSoundStore(state => state.shuffle);
  const locked = useSoundStore(state => state.locked);

  return (
    <Item
      disabled={locked}
      icon={<BiShuffle />}
      label={t('shuffleSounds')}
      onClick={shuffle}
    />
  );
}
