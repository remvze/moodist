import { FaHeadphonesAlt } from 'react-icons/fa/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

interface BinauralProps {
  open: () => void;
}

export function Binaural({ open }: BinauralProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<FaHeadphonesAlt />}
      label={t('toolbar.items.binaural')}
      onClick={open}
    />
  );
}
