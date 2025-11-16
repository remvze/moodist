import { MdTaskAlt } from 'react-icons/md/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface TodoProps {
  open: () => void;
}

export function Todo({ open }: TodoProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<MdTaskAlt />}
      label={t('todoChecklist')}
      shortcut="Shift + T"
      onClick={open}
    />
  );
}
