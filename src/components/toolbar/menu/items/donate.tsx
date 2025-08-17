import { SiBuymeacoffee } from 'react-icons/si/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

export function Donate() {
  const label = getLocalizedText('buyMeCoffee');

  return (
    <Item
      href="https://buymeacoffee.com/remvze"
      icon={<SiBuymeacoffee />}
      label={label}
    />
  );
}
