import { TbWaveSine } from 'react-icons/tb/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

interface IsochronicProps {
  open: () => void;
}

export function Isochronic({ open }: IsochronicProps) {
  const { t } = useTranslation(); // Get t function

  return (
    <Item
      icon={<TbWaveSine />}
      label={t('toolbar.items.isochronic')}
      onClick={open}
    />
  );
}
