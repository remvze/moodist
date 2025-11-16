import { SiBuymeacoffee } from 'react-icons/si/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

export function Donate() {
  const { t } = useTranslation();

  return (
    <Item
      href="https://buymeacoffee.com/remvze"
      icon={<SiBuymeacoffee />}
      label={t('buyMeACoffee')}
    />
  );
}
