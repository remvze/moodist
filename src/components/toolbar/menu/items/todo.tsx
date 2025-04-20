import { MdTaskAlt } from 'react-icons/md/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

interface TodoProps {
  open: () => void;
}

export function Todo({ open }: TodoProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<MdTaskAlt />}
      label={t('toolbar.items.todo')}
      shortcut="Shift + T"
      onClick={open}
    />
  );
}
