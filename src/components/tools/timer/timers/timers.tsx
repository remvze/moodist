import { useMemo } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Timer } from './timer';
import { Notice } from './notice';

import { useTimers } from '@/stores/timers';

import styles from './timers.module.css';

export function Timers() {
  const [animationParent] = useAutoAnimate();
  const [animationList] = useAutoAnimate();

  const timers = useTimers(state => state.timers);
  const spent = useTimers(state => state.spent());
  const total = useTimers(state => state.total());

  const spentMinutes = useMemo(() => Math.floor(spent / 60), [spent]);
  const totalMinutes = useMemo(() => Math.floor(total / 60), [total]);

  return (
    <div ref={animationParent}>
      {timers.length > 0 ? (
        <div className={styles.timers} ref={animationList}>
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
