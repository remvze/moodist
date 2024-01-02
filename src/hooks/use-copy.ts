import { useState, useCallback } from 'react';

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
