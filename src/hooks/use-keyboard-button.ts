import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

/**
 * A custom React hook that creates a keyboard event handler for 'Enter' and 'Space' keys.
 *
 * @param {Function} actionCallback - The function to be called when 'Enter' or 'Space' is pressed.
 * @returns {Function} A keyboard event handler function that triggers the action callback.
 */
export const useKeyboardButton = (
  actionCallback: () => void,
): ((event: KeyboardEvent<HTMLElement>) => void) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        actionCallback();
        event.stopPropagation();
      }
    },
    [actionCallback],
  );

  return handleKeyDown;
};
