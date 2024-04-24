import { dispatch, subscribe, unsubscribe } from './event';

export function closeModals() {
  dispatch('closeModals');
}

export function onCloseModals(listener: () => void) {
  subscribe('closeModals', listener);

  return () => unsubscribe('closeModals', listener);
}
