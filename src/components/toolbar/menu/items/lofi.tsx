import { IoIosMusicalNote } from 'react-icons/io/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface LofiProps {
  open: () => void;
}

export function Lofi({ open }: LofiProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<IoIosMusicalNote />}
      label={t('lofiMusicPlayer')}
      onClick={open}
    />
  );
}
