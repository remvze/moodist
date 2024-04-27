import { useEffect, useState, useCallback } from 'react';
import { Modal } from '@/components/modal';
import { FaPlay, FaUndo } from 'react-icons/fa/index';
import { useSoundStore } from '@/store';

import { Button } from '@/components/generic/button';
import { Timer } from '@/components/generic/timer';

import styles from './sleep-timer.module.css';

interface SleepTimerModalProps {
  onClose: () => void;
  show: boolean;
}

export function SleepTimerModal({ onClose, show }: SleepTimerModalProps) {
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('0');
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);

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

  // Handle multiple clicks on this. Only the latest click should be taken into account
  const handleStart = () => {
    if (timerId) clearInterval(timerId);

    setTimeLeft(calculateTotalSeconds);
    setRunning(true);

    if (timeLeft > 0) {
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

      setTimerId(newTimerId);
    }
  };

  const handleReset = () => {
    if (timerId) clearInterval(timerId);
    setTimeLeft(0);
    setRunning(false);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>Sleep Timer</h2>
      </header>
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
          <Button
            icon={<FaUndo />}
            smallIcon
            tooltip="Reset"
            onClick={handleReset}
          />
          {!running && (
            <Button
              icon={<FaPlay />}
              smallIcon
              tooltip={'Start'}
              onClick={handleStart}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
