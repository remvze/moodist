import { useState, useEffect, useCallback, useRef } from 'react';

import { Modal } from '@/components/modal';

import { useSoundEffect } from '@/hooks/use-sound-effect';
import { useAppState } from '@/hooks/use-app-state';
import { cn } from '@/helpers/styles';
import { padNumber } from '@/helpers/number';
import {
  cancelNotification,
  NOTIFICATION_IDS,
  scheduleNotification,
} from '@/lib/platform';

import styles from './countdown.module.css';

interface CountdownProps {
  onClose: () => void;
  show: boolean;
}

export function Countdown({ onClose, show }: CountdownProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  // Store target end time for sync on app resume
  const targetEndTimeRef = useRef<number | null>(null);

  const alarm = useSoundEffect('/sounds/alarm.mp3');

  // Sync timer when app returns from background
  useAppState(isAppActive => {
    if (isAppActive && isActive && targetEndTimeRef.current) {
      const remaining = Math.max(
        0,
        Math.floor((targetEndTimeRef.current - Date.now()) / 1000),
      );

      if (remaining <= 0) {
        // Timer completed while backgrounded
        alarm.play();
        setIsActive(false);
        setIsFormVisible(true);
        setTimeLeft(0);
        targetEndTimeRef.current = null;
        cancelNotification(NOTIFICATION_IDS.COUNTDOWN);
      } else {
        setTimeLeft(remaining);
      }
    }
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      alarm.play();
      setIsActive(false);
      setIsFormVisible(true);
      targetEndTimeRef.current = null;
    }

    return () => clearTimeout(timer);
  }, [isActive, timeLeft, alarm]);

  const handleStart = useCallback(() => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      const totalTime =
        (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);

      const endTime = Date.now() + totalTime * 1000;
      targetEndTimeRef.current = endTime;

      setTimeLeft(totalTime);
      setInitialTime(totalTime);
      setIsActive(true);
      setIsFormVisible(false);

      // Schedule notification for when timer ends (for background support)
      scheduleNotification({
        body: 'Your countdown timer has finished!',
        id: NOTIFICATION_IDS.COUNTDOWN,
        scheduleAt: new Date(endTime),
        title: 'Countdown Complete',
      });
    }
  }, [hours, minutes, seconds]);

  const handleBack = useCallback(() => {
    setIsActive(false);
    setIsFormVisible(true);
    setTimeLeft(0);
    targetEndTimeRef.current = null;
    // Cancel the scheduled notification
    cancelNotification(NOTIFICATION_IDS.COUNTDOWN);
  }, []);

  const toggleTimer = useCallback(() => {
    setIsActive(prev => {
      if (prev) {
        // Pausing - cancel the notification and clear target time
        cancelNotification(NOTIFICATION_IDS.COUNTDOWN);
        targetEndTimeRef.current = null;
      } else {
        // Resuming - reschedule with remaining time
        const endTime = Date.now() + timeLeft * 1000;
        targetEndTimeRef.current = endTime;
        scheduleNotification({
          body: 'Your countdown timer has finished!',
          id: NOTIFICATION_IDS.COUNTDOWN,
          scheduleAt: new Date(endTime),
          title: 'Countdown Complete',
        });
      }
      return !prev;
    });
  }, [timeLeft]);

  const formatTime = useCallback((time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return `${padNumber(hrs)}:${padNumber(mins)}:${padNumber(secs)}`;
  }, []);

  const elapsedTime = initialTime - timeLeft;

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>Countdown Timer</h2>
        <p className={styles.desc}>Super simple countdown timer.</p>
      </header>

      {isFormVisible ? (
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="HH"
              type="number"
              value={hours}
              onChange={e => setHours(Math.max(0, parseInt(e.target.value)))}
            />

            <span>:</span>

            <input
              className={styles.input}
              placeholder="MM"
              type="number"
              value={minutes}
              onChange={e =>
                setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value))))
              }
            />

            <span>:</span>

            <input
              className={styles.input}
              placeholder="SS"
              type="number"
              value={seconds}
              onChange={e =>
                setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value))))
              }
            />
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={cn(styles.button, styles.primary)}
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.timerContainer}>
          <div className={styles.displayTime}>
            <p className={styles.reverse}>- {formatTime(elapsedTime)}</p>
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleBack}>
              Back
            </button>

            <button
              className={cn(styles.button, styles.primary)}
              onClick={toggleTimer}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
