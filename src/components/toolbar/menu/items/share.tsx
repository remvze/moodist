import { IoShareSocialSharp } from 'react-icons/io5/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

import { useSoundStore } from '@/stores/sound';

interface ShareProps {
  open: () => void;
}

export function Share({ open }: ShareProps) {
  const { t } = useTranslation();
  const noSelected = useSoundStore(state => state.noSelected());

  return (
    <Item
      disabled={noSelected}
      icon={<IoShareSocialSharp />}
      label={t('toolbar.items.share')}
      shortcut="Shift + S"
      onClick={open}
    />
  );
}
