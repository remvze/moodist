import { LuGithub } from 'react-icons/lu/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

export function Source() {
  const { t } = useTranslation();

  return (
    <Item
      href="https://github.com/remvze/moodist"
      icon={<LuGithub />}
      label={t('sourceCode')}
    />
  );
}
