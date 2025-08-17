import { useState, useEffect, useCallback } from 'react';

import { Modal } from '@/components/modal';

import { useSoundEffect } from '@/hooks/use-sound-effect';
import { cn } from '@/helpers/styles';
import { padNumber } from '@/helpers/number';

import styles from './countdown.module.css';

// 安全地获取localStorage
function getLocalStorageItem(key: string, defaultValue: string = 'en'): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

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
  const [currentLang, setCurrentLang] = useState('en');

  const alarm = useSoundEffect('/sounds/alarm.mp3');

  // 在客户端初始化语言
  useEffect(() => {
    const lang = getLocalStorageItem('moodist-language');
    setCurrentLang(lang);
    
    // 监听语言变化
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

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

  // 获取本地化文本
  const titleText = currentLang === 'zh' ? '倒计时定时器' : 'Countdown Timer';
  const descText = currentLang === 'zh' ? '超级简单的倒计时定时器。' : 'Super simple countdown timer.';
  const startText = currentLang === 'zh' ? '开始' : 'Start';
  const backText = currentLang === 'zh' ? '返回' : 'Back';
  const pauseText = currentLang === 'zh' ? '暂停' : 'Pause';

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>{titleText}</h2>
        <p className={styles.desc}>{descText}</p>
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
              {startText}
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
              {backText}
            </button>

            <button
              className={cn(styles.button, styles.primary)}
              onClick={toggleTimer}
            >
              {isActive ? pauseText : startText}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
