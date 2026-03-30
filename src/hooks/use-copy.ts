import { useState, useCallback } from 'react';

import { writeToClipboard } from '@/lib/platform';

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
    async (content: string) => {
      if (copying) return;

      try {
        await writeToClipboard(content);
        setCopying(true);
        setTimeout(() => setCopying(false), timeout);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    },
    [copying, timeout],
  );

  return { copy, copying };
}
