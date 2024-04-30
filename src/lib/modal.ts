import { dispatch, subscribe } from './event';

export function closeModals() {
  dispatch('closeModals');
}

export function onCloseModals(listener: () => void) {
  const unsubscribe = subscribe('closeModals', listener);

  return unsubscribe;
}
