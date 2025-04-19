import { BiShuffle } from 'react-icons/bi/index';
import { useTranslation } from 'react-i18next';
import { useSoundStore } from '@/stores/sound';
import { Item } from '../item';

export function Shuffle() {
  const { t } = useTranslation();
  const shuffle = useSoundStore(state => state.shuffle);
  const locked = useSoundStore(state => state.locked);

  return (
    <Item
      disabled={locked}
      icon={<BiShuffle />}
      label={t('toolbar.items.shuffle')}
      onClick={shuffle}
    />
  );
}
