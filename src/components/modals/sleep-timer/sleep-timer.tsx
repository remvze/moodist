import { useEffect, useState, useRef, useMemo, useCallback } from 'react';

import { Modal } from '@/components/modal';
import { Timer } from './timer';
import { dispatch } from '@/lib/event';
import { useSoundStore } from '@/stores/sound';
import { cn } from '@/helpers/styles';
import { FADE_OUT } from '@/constants/events';
import { useSleepTimerStore } from '@/stores/sleep-timer';
import { useAppState } from '@/hooks/use-app-state';
import {
  cancelNotification,
  NOTIFICATION_IDS,
  scheduleNotification,
} from '@/lib/platform';

import styles from './sleep-timer.module.css';

interface SleepTimerModalProps {
  onClose: () => void;
  show: boolean;
}

export function SleepTimerModal({ onClose, show }: SleepTimerModalProps) {
  const setActive = useSleepTimerStore(state => state.set);
  const noSelected = useSoundStore(state => state.noSelected());

  const [running, setRunning] = useState(false);

  useEffect(() => setActive(running), [running, setActive]);

  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('10');

  const totalSeconds = useMemo(
    () =>
      (hours === '' ? 0 : parseInt(hours)) * 3600 +
      (minutes === '' ? 0 : parseInt(minutes)) * 60,
    [hours, minutes],
  );

  const [timeSpent, setTimeSpent] = useState(0);

  const timeLeft = useMemo(
    () => totalSeconds - timeSpent,
    [totalSeconds, timeSpent],
  );

  const timerId = useRef<ReturnType<typeof setInterval>>();

  // Store target end time for sync on app resume
  const targetEndTimeRef = useRef<number | null>(null);

  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);

  // Sync timer when app returns from background
  useAppState(isAppActive => {
    if (isAppActive && running && targetEndTimeRef.current) {
      const remaining = Math.max(
        0,
        Math.floor((targetEndTimeRef.current - Date.now()) / 1000),
      );

      if (remaining <= 0) {
        // Timer completed while backgrounded
        if (timerId.current) clearInterval(timerId.current);
        setRunning(false);
        dispatch(FADE_OUT, { duration: 1000 });
        setTimeSpent(0);
        targetEndTimeRef.current = null;
        cancelNotification(NOTIFICATION_IDS.SLEEP_TIMER);
      } else {
        // Update timeSpent to reflect actual elapsed time
        setTimeSpent(totalSeconds - remaining);
      }
    }
  });

  const handleStart = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    if (noSelected) return;
    if (!isPlaying) play();

    if (totalSeconds > 0) {
      const endTime = Date.now() + totalSeconds * 1000;
      targetEndTimeRef.current = endTime;

      setRunning(true);

      const newTimerId = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);

      timerId.current = newTimerId;

      // Schedule notification for when sleep timer ends
      scheduleNotification({
        body: 'Sounds have been faded out. Sweet dreams!',
        id: NOTIFICATION_IDS.SLEEP_TIMER,
        scheduleAt: new Date(endTime),
        title: 'Sleep Timer',
      });
    }
  }, [noSelected, isPlaying, play, totalSeconds]);

  useEffect(() => {
    if (timeLeft === 0 && running) {
      setRunning(false);

      dispatch(FADE_OUT, { duration: 1000 });

      setTimeSpent(0);
      targetEndTimeRef.current = null;

      if (timerId.current) clearInterval(timerId.current);
    }
  }, [timeLeft, running, pause]);

  const handleReset = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    setTimeSpent(0);
    setHours('0');
    setMinutes('10');
    setRunning(false);
    targetEndTimeRef.current = null;
    // Cancel the scheduled notification
    cancelNotification(NOTIFICATION_IDS.SLEEP_TIMER);
  }, []);

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
          <div className={styles.inputs}>
            {!running && (
              <Field label="Hours" value={hours} onChange={setHours} />
            )}

            {!running && (
              <Field label="Minutes" value={minutes} onChange={setMinutes} />
            )}
          </div>

          {running ? <Timer reverse={timeSpent} timer={timeLeft} /> : null}

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
                Start
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}

interface FieldProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
}

function Field({ label, onChange, value }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={label.toLocaleLowerCase()}>
        {label}
      </label>
      <input
        className={styles.input}
        id={label.toLocaleLowerCase()}
        max="59"
        min="0"
        required
        type="number"
        value={value}
        onChange={e => onChange(e.target.value === '' ? '' : e.target.value)}
      />
    </div>
  );
}
