import { useEffect } from 'react';

import { onCloseModal } from '@/lib/modal';

export function useCloseListener(listener: () => void) {
  useEffect(() => {
    const unsubscribe = onCloseModal(listener);

    return unsubscribe;
  }, [listener]);
}
