import { SiBuymeacoffee } from 'react-icons/si/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

export function Donate() {
  const { t } = useTranslation();

  return (
    <Item
      href="https://buymeacoffee.com/remvze"
      icon={<SiBuymeacoffee />} // Icon
      label={t('toolbar.items.buy-me-a-coffee')}
    />
  );
}
