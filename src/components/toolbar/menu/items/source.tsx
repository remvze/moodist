import { LuGithub } from 'react-icons/lu/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

export function Source() {
  const label = getLocalizedText('sourceCode');

  return (
    <Item
      href="https://github.com/remvze/moodist"
      icon={<LuGithub />}
      label={label}
    />
  );
}
