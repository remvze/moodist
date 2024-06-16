import { useMemo } from 'react';

import { padNumber } from '@/helpers/number';

import styles from './reverse-timer.module.css';

interface ReverseTimerProps {
  spent: number;
}

export function ReverseTimer({ spent }: ReverseTimerProps) {
  const hours = useMemo(() => Math.floor(spent / 3600), [spent]);
  const minutes = useMemo(() => Math.floor((spent % 3600) / 60), [spent]);
  const seconds = useMemo(() => spent % 60, [spent]);

  return (
    <div className={styles.reverseTimer}>
      -{padNumber(hours)}:{padNumber(minutes)}:{padNumber(seconds)}
    </div>
  );
}
