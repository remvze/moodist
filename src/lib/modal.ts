import { dispatch, subscribe, unsubscribe } from './event';

export function closeModals() {
  dispatch('closeModals');
}

export function onCloseModal(listener: () => void) {
  subscribe('closeModals', listener);

  return () => unsubscribe('closeModals', listener);
}
