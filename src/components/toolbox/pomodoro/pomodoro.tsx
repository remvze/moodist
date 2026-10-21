import { useState, useEffect } from 'react';
import { FaUndo, FaPlay, FaPause } from 'react-icons/fa/index';

import { Modal, ModalHeader, ModalTitle } from '@/components/modal';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import {
  usePomodoroStore,
  pomodoroModes,
  formatPomodoroTime,
} from '@/stores/pomodoro';
import { useSettingsStore } from '@/stores/settings';

import styles from './pomodoro.module.css';

interface PomodoroProps {
  onClose: () => void;
  show: boolean;
}

const storageKey = 'moodist-pomodoro-setting';

export function Pomodoro({ onClose, show }: PomodoroProps) {
  const timer = usePomodoroStore();
  const [ready, setReady] = useState(false);
  const [minutes, setMinutes] = useState('25');
  const alarmVolume = useSettingsStore(state => state.alarmVolume);
  const alarm = useSoundEffect('/sounds/alarm.mp3', alarmVolume);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) usePomodoroStore.getState().configure(JSON.parse(saved));
    } catch {
      // Invalid or unavailable saved preferences fall back to the defaults.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(timer.durations));
    } catch {
      // The timer also works when browser storage is unavailable.
    }
  }, [timer.durations, ready]);

  useEffect(() => {
    setMinutes(String(timer.durations[timer.mode] / 60));
  }, [timer.mode, timer.durations]);

  useEffect(() => {
    if (!timer.running) return;
    const update = () => {
      usePomodoroStore.getState().tick();
    };
    const interval = setInterval(update, 250);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', update);
    };
  }, [timer.running]);

  useEffect(
    () =>
      usePomodoroStore.subscribe((state, previous) => {
        if (state.completions !== previous.completions) alarm.play();
      }),
    [alarm],
  );

  const quickStart = (duration: number) => {
    timer.setDuration(duration * 60);
    timer.start();
  };
  const presets = timer.mode === 'pomodoro' ? [15, 25, 50] : [5, 10, 15];

  return (
    <Modal docked show={show} onClose={onClose}>
      <ModalHeader>
        <div>
          <ModalTitle>Focus timer</ModalTitle>
          <p className={styles.hint}>
            Pick a duration to start. Keep your sounds close.
          </p>
        </div>
      </ModalHeader>
      <div role="group" aria-label="Timer mode" className={styles.modes}>
        {pomodoroModes.map(({ id, label }) => (
          <button
            aria-pressed={timer.mode === id}
            key={id}
            onClick={() => timer.setMode(id)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.time} role="timer" aria-label="Time remaining">
        {formatPomodoroTime(timer.remaining)}
      </div>
      <p className={styles.status}>
        {timer.running
          ? 'Time for one thing.'
          : timer.remaining === 0
            ? 'Session complete. Take a breath.'
            : 'Ready when you are.'}
      </p>
      <div role="group" aria-label="Quick start" className={styles.presets}>
        {presets.map(value => (
          <button
            aria-label={`Start ${value} minute ${timer.mode === 'pomodoro' ? 'focus' : 'break'}`}
            key={value}
            onClick={() => quickStart(value)}
            type="button"
          >
            {value} min
          </button>
        ))}
      </div>
      <form
        className={styles.custom}
        onSubmit={event => {
          event.preventDefault();
          const value = Number(minutes);
          if (!Number.isInteger(value) || value < 1 || value > 180) return;
          quickStart(value);
        }}
      >
        <label htmlFor="focus-duration">Custom minutes</label>
        <input
          id="focus-duration"
          min={1}
          max={180}
          required
          step={1}
          type="number"
          value={minutes}
          onChange={event => setMinutes(event.target.value)}
        />
        <button type="submit">Start</button>
      </form>
      <div className={styles.control}>
        <button
          aria-label="Reset focus timer"
          className={styles.reset}
          onClick={timer.reset}
          type="button"
        >
          <FaUndo aria-hidden="true" />
        </button>
        <button
          className={styles.primary}
          onClick={timer.running ? timer.pause : timer.start}
          type="button"
        >
          {timer.running ? (
            <FaPause aria-hidden="true" />
          ) : (
            <FaPlay aria-hidden="true" />
          )}
          {timer.running
            ? 'Pause timer'
            : timer.remaining < timer.durations[timer.mode] &&
                timer.remaining > 0
              ? 'Resume timer'
              : 'Start timer'}
        </button>
      </div>
      <p className={styles.completed}>
        {timer.completions[timer.mode]} completed · Keeps running when tucked
        away.
      </p>
    </Modal>
  );
}
