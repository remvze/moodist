import { useState, useCallback } from 'react';

/**
 * A custom React hook to copy text to the clipboard with a temporary state indication.
 *
 * @param {number} [timeout=1500] - The duration in milliseconds for which the `copying` state remains true. Defaults to 1500 milliseconds.
 * @returns {{ copy: (content: string) => void, copying: boolean }} An object containing:
 *   - copy: The function to copy content to the clipboard.
 *   - copying: A boolean indicating if a copy operation is in progress.
 */
export function useCopy(timeout = 1500) {
  const [copying, setCopying] = useState(false);

  const copy = useCallback(
    (content: string) => {
      if (copying) return;

      navigator.clipboard.writeText(content);
      setCopying(true);

      setTimeout(() => setCopying(false), timeout);
    },
    [copying, timeout],
  );

  return { copy, copying };
}
