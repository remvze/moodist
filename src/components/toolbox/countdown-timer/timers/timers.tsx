import { useMemo } from 'react';

import { Timer } from './timer';
import { Notice } from './notice';

import { useCountdownTimers } from '@/stores/countdown-timers';

import styles from './timers.module.css';

export function Timers() {
  const timers = useCountdownTimers(state => state.timers);
  const spent = useCountdownTimers(state => state.spent());
  const total = useCountdownTimers(state => state.total());

  const spentMinutes = useMemo(() => Math.floor(spent / 60), [spent]);
  const totalMinutes = useMemo(() => Math.floor(total / 60), [total]);

  return (
    <div>
      {timers.length > 0 ? (
        <div className={styles.timers}>
          <header>
            <h2 className={styles.title}>Timers</h2>
            <div className={styles.line} />
            {totalMinutes > 0 && (
              <p className={styles.spent}>
                {spentMinutes} / {totalMinutes} Minute
                {totalMinutes !== 1 && 's'}
              </p>
            )}
          </header>

          {timers.map(timer => (
            <Timer id={timer.id} key={timer.id} />
          ))}

          <Notice />
        </div>
      ) : null}
    </div>
  );
}
