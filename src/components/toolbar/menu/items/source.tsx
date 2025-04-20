import { LuGithub } from 'react-icons/lu/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

export function Source() {
  const { t } = useTranslation();

  return (
    <Item
      href="https://github.com/remvze/moodist"
      icon={<LuGithub />}
      label={t('toolbar.items.source-code')}
    />
  );
}
