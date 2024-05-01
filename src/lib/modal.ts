import { dispatch, subscribe } from './event';
import { CLOSE_MODALS } from '@/constants/events';

export function closeModals() {
  dispatch(CLOSE_MODALS);
}

export function onCloseModals(listener: () => void) {
  const unsubscribe = subscribe(CLOSE_MODALS, listener);

  return unsubscribe;
}
