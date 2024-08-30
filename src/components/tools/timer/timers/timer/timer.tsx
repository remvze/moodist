import { useRef, useMemo, useState, useEffect } from 'react';
import { IoPlay, IoPause, IoRefresh, IoTrashOutline } from 'react-icons/io5';

import { Toolbar } from './toolbar';

import { useTimers } from '@/stores/timers';
import { useAlarm } from '@/hooks/use-alarm';
import { useSnackbar } from '@/contexts/snackbar';
import { padNumber } from '@/helpers/number';
import { cn } from '@/helpers/styles';

import styles from './timer.module.css';

interface TimerProps {
  id: string;
}

export function Timer({ id }: TimerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastActiveTimeRef = useRef<number | null>(null);
  const lastStateRef = useRef<{ spent: number; total: number } | null>(null);

  const [isRunning, setIsRunning] = useState(false);

  const { first, last, name, spent, total } = useTimers(state =>
    state.getTimer(id),
  );
  const tick = useTimers(state => state.tick);
  const rename = useTimers(state => state.rename);
  const reset = useTimers(state => state.reset);
  const deleteTimer = useTimers(state => state.delete);

  const left = useMemo(() => total - spent, [total, spent]);

  const hours = useMemo(() => Math.floor(left / 3600), [left]);
  const minutes = useMemo(() => Math.floor((left % 3600) / 60), [left]);
  const seconds = useMemo(() => left % 60, [left]);

  const [isReversed, setIsReversed] = useState(false);

  const spentHours = useMemo(() => Math.floor(spent / 3600), [spent]);
  const spentMinutes = useMemo(() => Math.floor((spent % 3600) / 60), [spent]);
  const spentSeconds = useMemo(() => spent % 60, [spent]);

  const playAlarm = useAlarm();

  const showSnackbar = useSnackbar();

  const handleStart = () => {
    if (left > 0) setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleToggle = () => {
    if (isRunning) handlePause();
    else handleStart();
  };

  const handleReset = () => {
    if (spent === 0) return;

    if (isRunning) return showSnackbar('Please first stop the timer.');

    setIsRunning(false);
    reset(id);
  };

  const handleDelete = () => {
    if (isRunning) return showSnackbar('Please first stop the timer.');

    deleteTimer(id);
  };

  useEffect(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => tick(id), 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, tick, id]);

  useEffect(() => {
    if (left === 0 && isRunning) {
      setIsRunning(false);
      playAlarm();

      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [left, isRunning, playAlarm]);

  useEffect(() => {
    const handleBlur = () => {
      if (isRunning) {
        lastActiveTimeRef.current = Date.now();
        lastStateRef.current = { spent, total };
      }
    };

    const handleFocus = () => {
      if (isRunning && lastActiveTimeRef.current && lastStateRef.current) {
        const elapsed = Math.floor(
          (Date.now() - lastActiveTimeRef.current) / 1000,
        );
        const previousLeft =
          lastStateRef.current.total - lastStateRef.current.spent;
        const currentLeft = left;
        const correctedLeft = previousLeft - elapsed;

        if (correctedLeft < currentLeft) {
          tick(id, currentLeft - correctedLeft);
        }

        lastActiveTimeRef.current = null;
        lastStateRef.current = null;
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isRunning, tick, id, spent, total, left]);

  return (
    <div className={styles.timer}>
      <header className={styles.header}>
        <div className={styles.bar}>
          <div
            className={styles.completed}
            style={{ width: `${(left / total) * 100}%` }}
          />
        </div>
      </header>

      <Toolbar first={first} id={id} last={last} />

      <div
        className={styles.left}
        tabIndex={0}
        onClick={() => setIsReversed(prev => !prev)}
        onKeyDown={() => setIsReversed(prev => !prev)}
      >
        {!isReversed ? (
          <>
            {padNumber(hours)}
            <span>:</span>
            {padNumber(minutes)}
            <span>:</span>
            {padNumber(seconds)}
          </>
        ) : (
          <>
            <span>-</span>
            {padNumber(spentHours)}
            <span>:</span>
            {padNumber(spentMinutes)}
            <span>:</span>
            {padNumber(spentSeconds)}
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <div className={styles.control}>
          <input
            className={cn(styles.input, left === 0 && styles.finished)}
            placeholder="Untitled"
            type="text"
            value={name}
            onChange={e => rename(id, e.target.value)}
          />

          <button
            aria-disabled={isRunning || spent === 0}
            className={cn(
              styles.button,
              styles.reset,
              (isRunning || spent === 0) && styles.disabled,
            )}
            onClick={handleReset}
          >
            <IoRefresh />
          </button>

          <button
            className={styles.button}
            disabled={!isRunning && left === 0}
            onClick={handleToggle}
          >
            {isRunning ? <IoPause /> : <IoPlay />}
          </button>
        </div>

        <button
          aria-disabled={isRunning}
          className={cn(styles.delete, isRunning && styles.disabled)}
          onClick={handleDelete}
        >
          <IoTrashOutline />
        </button>
      </footer>
    </div>
  );
}
