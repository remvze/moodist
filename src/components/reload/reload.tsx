import { useEffect, useState } from 'react';

import { ReloadModal } from './reload-modal';
import { isNativePlatform } from '@/lib/platform';

export function Reload() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  // Skip PWA reload on native apps
  if (isNativePlatform()) return null;

  return isBrowser ? <ReloadModal /> : null;
}
