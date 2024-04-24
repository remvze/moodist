import { useEffect } from 'react';

import { onCloseModals } from '@/lib/modal';

export function useCloseListener(listener: () => void) {
  useEffect(() => {
    const unsubscribe = onCloseModals(listener);

    return unsubscribe;
  }, [listener]);
}
