import { useEffect } from 'react';

import { onCloseModals } from '@/lib/modal';

/**
 * A custom React hook that registers a listener function to be called when modals are to be closed.
 *
 * @param {Function} listener - The function to be called when modals are to be closed.
 */
export function useCloseListener(listener: () => void) {
  useEffect(() => {
    const unsubscribe = onCloseModals(listener);

    return unsubscribe;
  }, [listener]);
}
