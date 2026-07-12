import { useEffect, useState, useRef, useMemo } from 'react';

import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';
import { Timer } from './timer';
import { dispatch } from '@/lib/event';
import { useSoundStore } from '@/stores/sound';
import { FADE_OUT } from '@/constants/events';
import { useSleepTimerStore } from '@/stores/sleep-timer';

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
      (hours === '' ? 0 : Number.parseInt(hours, 10)) * 3600 +
      (minutes === '' ? 0 : Number.parseInt(minutes, 10)) * 60,
    [hours, minutes],
  );

  const [timeSpent, setTimeSpent] = useState(0);

  const timeLeft = useMemo(
    () => totalSeconds - timeSpent,
    [totalSeconds, timeSpent],
  );

  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);

  const handleStart = () => {
    if (timerId.current) clearInterval(timerId.current);
    if (noSelected) return;
    if (!isPlaying) play();

    if (totalSeconds > 0) {
      setRunning(true);

      const newTimerId = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);

      timerId.current = newTimerId;
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setRunning(false);

      dispatch(FADE_OUT, { duration: 1000 });

      setTimeSpent(0);

      if (timerId.current) clearInterval(timerId.current);
    }
  }, [timeLeft, pause]);

  const handleReset = () => {
    if (timerId.current) clearInterval(timerId.current);
    setTimeSpent(0);
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
      <ModalHeader>
        <div>
          <ModalTitle>Sleep Timer</ModalTitle>
          <ModalDescription>
            Stop sounds after a certain amount of time.
          </ModalDescription>
        </div>
      </ModalHeader>

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

          <ModalActions>
            {running && (
              <ModalButton type="button" onClick={handleReset}>
                Reset
              </ModalButton>
            )}

            {!running && (
              <ModalButton variant="primary" type="submit">
                Start
              </ModalButton>
            )}
          </ModalActions>
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
