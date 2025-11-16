import { TbWaveSine } from 'react-icons/tb/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface IsochronicProps {
  open: () => void;
}

export function Isochronic({ open }: IsochronicProps) {
  const { t } = useTranslation();

  return <Item icon={<TbWaveSine />} label={t('isochronicTones')} onClick={open} />;
}
