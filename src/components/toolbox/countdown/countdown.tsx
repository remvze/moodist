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

  const elapsedTime = initialTime - timeLeft;

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        <div>
          <ModalTitle>Countdown Timer</ModalTitle>
          <ModalDescription>Super simple countdown timer.</ModalDescription>
        </div>
      </ModalHeader>

      {isFormVisible ? (
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="HH"
              type="number"
              value={hours}
              onChange={e =>
                setHours(Math.max(0, Number.parseInt(e.target.value, 10) || 0))
              }
            />

            <span>:</span>

            <input
              className={styles.input}
              placeholder="MM"
              type="number"
              value={minutes}
              onChange={e =>
                setMinutes(
                  Math.max(
                    0,
                    Math.min(59, Number.parseInt(e.target.value, 10)),
                  ),
                )
              }
            />

            <span>:</span>

            <input
              className={styles.input}
              placeholder="SS"
              type="number"
              value={seconds}
              onChange={e =>
                setSeconds(
                  Math.max(
                    0,
                    Math.min(59, Number.parseInt(e.target.value, 10)),
                  ),
                )
              }
            />
          </div>

          <ModalActions>
            <ModalButton variant="primary" onClick={handleStart}>
              Start
            </ModalButton>
          </ModalActions>
        </div>
      ) : (
        <div className={styles.timerContainer}>
          <div className={styles.displayTime}>
            <p className={styles.reverse}>- {formatTime(elapsedTime)}</p>
            <span>{formatTime(timeLeft)}</span>
          </div>

          <ModalActions>
            <ModalButton onClick={handleBack}>Back</ModalButton>

            <ModalButton variant="primary" onClick={toggleTimer}>
              {isActive ? 'Pause' : 'Start'}
            </ModalButton>
          </ModalActions>
        </div>
      )}
    </Modal>
  );
}
