import { useEffect, useState } from 'react';

import { ReloadModal } from './reload-modal';

export function Reload() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  return isBrowser ? <ReloadModal /> : null;
}
