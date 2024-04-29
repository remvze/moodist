import { useEffect, useState, useCallback, useRef } from 'react';

import { Modal } from '@/components/modal';
import { Timer } from '@/components/timer';
import { useSoundStore } from '@/store';
import { cn } from '@/helpers/styles';

import styles from './sleep-timer.module.css';

interface SleepTimerModalProps {
  onClose: () => void;
  show: boolean;
}

export function SleepTimerModal({ onClose, show }: SleepTimerModalProps) {
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('10');
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const timerId = useRef<NodeJS.Timeout>();

  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);

  const calculateTotalSeconds = useCallback((): number => {
    return (
      (hours === '' ? 0 : parseInt(hours)) * 3600 +
      (minutes === '' ? 0 : parseInt(minutes)) * 60
    );
  }, [minutes, hours]);

  useEffect(() => {
    setTimeLeft(calculateTotalSeconds());
  }, [calculateTotalSeconds]);

  const handleStart = () => {
    if (timerId.current) clearInterval(timerId.current);
    if (!isPlaying) play();

    setTimeLeft(calculateTotalSeconds);

    if (timeLeft > 0) {
      setRunning(true);

      const newTimerId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft <= 0) {
            clearInterval(newTimerId);
            pause();
            setRunning(false);
            return 0;
          }
          return newTimeLeft;
        });
      }, 1000);

      timerId.current = newTimerId;
    }
  };

  const handleReset = () => {
    if (timerId.current) clearInterval(timerId.current);
    setTimeLeft(0);
    setHours('0');
    setMinutes('10');
    setRunning(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleStart();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>Sleep Timer</h2>
        <p className={styles.desc}>
          Stop sounds after a certain amount of time.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className={styles.controls}>
          {!running && (
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="hours">
                Hours:
              </label>
              <input
                className={styles.input}
                id="hours"
                min="0"
                required
                type="number"
                value={hours}
                onChange={e =>
                  setHours(e.target.value === '' ? '' : e.target.value)
                }
              />
            </div>
          )}

          {!running && (
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="minutes">
                Minutes:
              </label>
              <input
                className={styles.input}
                max="59"
                min="0"
                required
                type="number"
                value={minutes}
                onChange={e =>
                  setMinutes(e.target.value === '' ? '' : e.target.value)
                }
              />
            </div>
          )}

          {running ? <Timer displayHours={true} timer={timeLeft} /> : null}

          <div className={styles.buttons}>
            {running && (
              <button
                className={styles.button}
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            )}

            {!running && (
              <button
                className={cn(styles.button, styles.primary)}
                type="submit"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
