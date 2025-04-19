import { RiPlayListFill } from 'react-icons/ri/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

interface PresetsProps {
  open: () => void;
}

export function Presets({ open }: PresetsProps) {
  const { t } = useTranslation();
  return (
    <Item
      icon={<RiPlayListFill />}
      label={t('toolbar.items.presets')}
      shortcut="Shift + Alt + P"
      onClick={open}
    />
  );
}
