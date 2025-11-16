import { IoShareSocialSharp } from 'react-icons/io5/index';

import { Item } from '../item';

import { useSoundStore } from '@/stores/sound';
import { useTranslation } from '@/hooks/useTranslation';

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
      label={t('share')}
      shortcut="Shift + S"
      onClick={open}
    />
  );
}
