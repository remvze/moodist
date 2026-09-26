import { useState, useEffect, useCallback } from 'react';

import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';

import { useSoundEffect } from '@/hooks/use-sound-effect';
import { useSettingsStore } from '@/stores/settings';
import { padNumber } from '@/helpers/number';

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
  const alarmVolume = useSettingsStore(state => state.alarmVolume);

  const alarm = useSoundEffect('/sounds/alarm.mp3', alarmVolume);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      alarm.play();
      setIsActive(false);
      setIsFormVisible(true);
    }

    return () => clearTimeout(timer);
  }, [isActive, timeLeft, alarm]);

  const handleStart = useCallback(() => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      const totalTime =
        (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);

      setTimeLeft(totalTime);
      setInitialTime(totalTime);
      setIsActive(true);
      setIsFormVisible(false);
    }
  }, [hours, minutes, seconds]);

  const handleBack = useCallback(() => {
    setIsActive(false);
    setIsFormVisible(true);
    setTimeLeft(0);
  }, []);

  const toggleTimer = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const formatTime = useCallback((time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return `${padNumber(hrs)}:${padNumber(mins)}:${padNumber(secs)}`;
  }, []);

  const duration = hours * 3600 + minutes * 60 + seconds;
  const elapsedTime = initialTime - timeLeft;
  const progress = initialTime > 0 ? (elapsedTime / initialTime) * 100 : 0;

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        <div>
          <ModalTitle>Countdown Timer</ModalTitle>
          <ModalDescription>
            Set a duration and get an alert when time is up.
          </ModalDescription>
        </div>
      </ModalHeader>

      {isFormVisible ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleStart();
          }}
        >
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="countdown-hours">Hours</label>
              <input
                id="countdown-hours"
                inputMode="numeric"
                min={0}
                type="number"
                value={hours}
                onChange={event =>
                  setHours(
                    Math.max(0, Number.parseInt(event.target.value, 10) || 0),
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="countdown-minutes">Minutes</label>
              <input
                id="countdown-minutes"
                inputMode="numeric"
                max={59}
                min={0}
                type="number"
                value={minutes}
                onChange={event =>
                  setMinutes(
                    Math.max(
                      0,
                      Math.min(
                        59,
                        Number.parseInt(event.target.value, 10) || 0,
                      ),
                    ),
                  )
                }
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="countdown-seconds">Seconds</label>
              <input
                id="countdown-seconds"
                inputMode="numeric"
                max={59}
                min={0}
                type="number"
                value={seconds}
                onChange={event =>
                  setSeconds(
                    Math.max(
                      0,
                      Math.min(
                        59,
                        Number.parseInt(event.target.value, 10) || 0,
                      ),
                    ),
                  )
                }
              />
            </div>
          </div>

          <ModalActions>
            <ModalButton
              disabled={duration === 0}
              type="submit"
              variant="primary"
            >
              Start
            </ModalButton>
          </ModalActions>
        </form>
      ) : (
        <div>
          <div className={styles.displayTime}>
            <p className={styles.status}>
              {isActive ? 'Counting down' : 'Paused'}
            </p>
            <span className={styles.time} role="timer">
              {formatTime(timeLeft)}
            </span>
            <div
              aria-label="Countdown progress"
              aria-valuemax={initialTime}
              aria-valuemin={0}
              aria-valuenow={elapsedTime}
              className={styles.progress}
              role="progressbar"
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={styles.elapsed}>Elapsed {formatTime(elapsedTime)}</p>
          </div>

          <ModalActions>
            <ModalButton onClick={handleBack}>Change time</ModalButton>

            <ModalButton variant="primary" onClick={toggleTimer}>
              {isActive ? 'Pause' : 'Resume'}
            </ModalButton>
          </ModalActions>
        </div>
      )}
    </Modal>
  );
}
