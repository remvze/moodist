import { padNumber } from '@/helpers/number';

import styles from './reverse.module.css';

interface ReverseProps {
  time: number;
}

export function Reverse({ time }: ReverseProps) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  hours = isNaN(hours) ? 0 : hours;
  minutes = isNaN(minutes) ? 0 : minutes;
  seconds = isNaN(seconds) ? 0 : seconds;

  const formattedHours = padNumber(hours);
  const formattedMinutes = padNumber(minutes);
  const formattedSeconds = padNumber(seconds);

  return (
    <div className={styles.reverse}>
      - {formattedHours}:{formattedMinutes}:{formattedSeconds}
    </div>
  );
}
