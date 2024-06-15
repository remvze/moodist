import { dispatch, subscribe } from './event';
import { CLOSE_MODALS } from '@/constants/events';

/**
 * Dispatches the CLOSE_MODALS event to signal that modals should be closed.
 */
export function closeModals() {
  dispatch(CLOSE_MODALS);
}

/**
 * Subscribes a listener function to the CLOSE_MODALS event.
 *
 * @param {() => void} listener - The function to be called when the CLOSE_MODALS event is dispatched.
 * @returns {Function} A function to unsubscribe the listener from the CLOSE_MODALS event.
 */
export function onCloseModals(listener: () => void) {
  const unsubscribe = subscribe(CLOSE_MODALS, listener);

  return unsubscribe;
}
