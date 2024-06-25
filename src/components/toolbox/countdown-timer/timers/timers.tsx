import { useMemo, forwardRef } from 'react';

import { Timer } from './timer';
import { Notice } from './notice';

import { useCountdownTimers } from '@/stores/countdown-timers';

import styles from './timers.module.css';

interface TimersProps {
  enableAnimations: (enabled: boolean) => void;
}

export const Timers = forwardRef(function Timers(
  { enableAnimations }: TimersProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
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

          <div ref={ref}>
            {timers.map(timer => (
              <Timer
                enableAnimations={enableAnimations}
                id={timer.id}
                key={timer.id}
              />
            ))}
          </div>

          <Notice />
        </div>
      ) : null}
    </div>
  );
});
