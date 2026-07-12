import { useEffect, useState } from 'react';

import { generateRandomBinaryString } from '@/helpers/binary';

type BinaryProps = {
  initialValue: string;
};

const UPDATE_INTERVAL = 120;

export function Binary({ initialValue }: BinaryProps) {
  const [binary, setBinary] = useState(initialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setBinary(generateRandomBinaryString(initialValue.length));
    }, UPDATE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [initialValue.length]);

  return <span>{binary}</span>;
}
