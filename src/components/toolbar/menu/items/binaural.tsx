import { FaHeadphonesAlt } from 'react-icons/fa/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface BinauralProps {
  open: () => void;
}

export function Binaural({ open }: BinauralProps) {
  const { t } = useTranslation();

  return (
    <Item icon={<FaHeadphonesAlt />} label={t('binauralBeats')} onClick={open} />
  );
}
