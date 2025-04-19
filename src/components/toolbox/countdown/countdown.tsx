import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';

import { useSoundEffect } from '@/hooks/use-sound-effect';
import { cn } from '@/helpers/styles';
import { padNumber } from '@/helpers/number';

import styles from './countdown.module.css';

interface CountdownProps {
  onClose: () => void;
  show: boolean;
}

export function Countdown({ onClose, show }: CountdownProps) {
  const { t } = useTranslation();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const alarm = useSoundEffect('/sounds/alarm.mp3');

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
      <header className={styles.header}>
        <h2 className={styles.title}>{t('modals.countdown.title')}</h2>
        <p className={styles.desc}>{t('modals.countdown.description')}</p>
      </header>

      {isFormVisible ? (
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder={t('modals.countdown.placeholder-hh') || 'HH'} // Placeholder
              type="number"
              value={hours === 0 ? '' : hours} // Show empty if 0
              onChange={e =>
                setHours(Math.max(0, parseInt(e.target.value || '0')))
              }
            />

            <span>:</span>

            <input
              className={styles.input}
              placeholder={t('modals.countdown.placeholder-mm') || 'MM'}
              type="number"
              value={minutes === 0 ? '' : minutes} // Show empty if 0
              onChange={e =>
                setMinutes(
                  Math.max(0, Math.min(59, parseInt(e.target.value || '0'))),
                )
              }
            />
            <span>:</span>
            <input
              className={styles.input}
              placeholder={t('modals.countdown.placeholder-ss') || 'SS'}
              type="number"
              value={seconds === 0 ? '' : seconds} // Show empty if 0
              onChange={e =>
                setSeconds(
                  Math.max(0, Math.min(59, parseInt(e.target.value || '0'))),
                )
              }
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={cn(styles.button, styles.primary)}
              onClick={handleStart}
            >
              {t('common.start')}
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
              {t('common.back')}
            </button>
            <button
              className={cn(styles.button, styles.primary)}
              onClick={toggleTimer}
            >
              {isActive ? t('common.pause') : t('common.start')}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
