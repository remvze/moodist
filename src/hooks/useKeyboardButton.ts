import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

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
