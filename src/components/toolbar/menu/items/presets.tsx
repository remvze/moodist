import { RiPlayListFill } from 'react-icons/ri/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface PresetsProps {
  open: () => void;
}

export function Presets({ open }: PresetsProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<RiPlayListFill />}
      label={t('presets')}
      data-i18n="navigation.presets"
      shortcut="Shift + Alt + P"
      onClick={open}
    />
  );
}
