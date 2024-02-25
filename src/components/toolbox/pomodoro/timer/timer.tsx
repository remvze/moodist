import { padNumber } from '@/helpers/number';

import styles from './timer.module.css';

interface TimerProps {
  timer: number;
}

export function Timer({ timer }: TimerProps) {
  return (
    <div className={styles.timer}>
      {padNumber(Math.floor(timer / 60))}:{padNumber(timer % 60)}
    </div>
  );
}
