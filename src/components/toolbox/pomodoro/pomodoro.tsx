import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { FaUndo, FaPlay, FaPause } from 'react-icons/fa/index';
import { IoMdSettings } from 'react-icons/io/index';

import { Modal } from '@/components/modal';
import { Button } from '../generics/button';
import { Timer } from './timer';
import { Tabs } from './tabs';
import { Setting } from './setting';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { useAppState } from '@/hooks/use-app-state';
import { usePomodoroStore } from '@/stores/pomodoro';
import { useCloseListener } from '@/hooks/use-close-listener';
import {
  cancelNotification,
  NOTIFICATION_IDS,
  scheduleNotification,
} from '@/lib/platform';

import styles from './pomodoro.module.css';

interface PomodoroProps {
  onClose: () => void;
  open: () => void;
  show: boolean;
}

export function Pomodoro({ onClose, open, show }: PomodoroProps) {
  const [showSetting, setShowSetting] = useState(false);

  const [selectedTab, setSelectedTab] = useState('pomodoro');

  const running = usePomodoroStore(state => state.running);
  const setRunning = usePomodoroStore(state => state.setRunning);

  const [timer, setTimer] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Store target end time for sync on app resume
  const targetEndTimeRef = useRef<number | null>(null);

  const alarm = useSoundEffect('/sounds/alarm.mp3');

  const defaultTimes = useMemo(
    () => ({
      long: 15 * 60,
      pomodoro: 25 * 60,
      short: 5 * 60,
    }),
    [],
  );

  const [times, setTimes] = useLocalStorage<Record<string, number>>(
    'moodist-pomodoro-setting',
    defaultTimes,
  );

  const [completions, setCompletions] = useState<Record<string, number>>({
    long: 0,
    pomodoro: 0,
    short: 0,
  });

  const tabs = useMemo(
    () => [
      { id: 'pomodoro', label: 'Pomodoro' },
      { id: 'short', label: 'Break' },
      { id: 'long', label: 'Long Break' },
    ],
    [],
  );

  useCloseListener(() => setShowSetting(false));

  // Sync timer when app returns from background
  useAppState(isAppActive => {
    if (isAppActive && running && targetEndTimeRef.current) {
      const remaining = Math.max(
        0,
        Math.floor((targetEndTimeRef.current - Date.now()) / 1000),
      );

      if (remaining <= 0) {
        // Timer completed while backgrounded
        if (interval.current) clearInterval(interval.current);
        alarm.play();
        setRunning(false);
        setCompletions(prev => ({
          ...prev,
          [selectedTab]: prev[selectedTab] + 1,
        }));
        setTimer(0);
        targetEndTimeRef.current = null;
        cancelNotification(NOTIFICATION_IDS.POMODORO);
      } else {
        setTimer(remaining);
      }
    }
  });

  useEffect(() => {
    if (running) {
      if (interval.current) clearInterval(interval.current);

      interval.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      if (interval.current) clearInterval(interval.current);
    }
  }, [running]);

  useEffect(() => {
    if (timer <= 0 && running) {
      if (interval.current) clearInterval(interval.current);

      alarm.play();

      setRunning(false);
      setCompletions(prev => ({
        ...prev,
        [selectedTab]: prev[selectedTab] + 1,
      }));
      targetEndTimeRef.current = null;
    }
  }, [timer, selectedTab, running, setRunning, alarm]);

  useEffect(() => {
    const time = times[selectedTab] || 10;

    if (interval.current) clearInterval(interval.current);

    setRunning(false);
    setTimer(time);
    targetEndTimeRef.current = null;
  }, [selectedTab, times, setRunning]);

  const toggleRunning = useCallback(() => {
    if (running) {
      setRunning(false);
      targetEndTimeRef.current = null;
      // Cancel notification when pausing
      cancelNotification(NOTIFICATION_IDS.POMODORO);
    } else if (timer <= 0) {
      const time = times[selectedTab] || 10;
      const endTime = Date.now() + time * 1000;
      targetEndTimeRef.current = endTime;
      setTimer(time);
      setRunning(true);
      // Schedule notification for when timer ends
      scheduleNotification({
        body: `${selectedTab === 'pomodoro' ? 'Focus session' : 'Break'} complete!`,
        id: NOTIFICATION_IDS.POMODORO,
        scheduleAt: new Date(endTime),
        title: 'Pomodoro Timer',
      });
    } else {
      const endTime = Date.now() + timer * 1000;
      targetEndTimeRef.current = endTime;
      setRunning(true);
      // Schedule notification with remaining time
      scheduleNotification({
        body: `${selectedTab === 'pomodoro' ? 'Focus session' : 'Break'} complete!`,
        id: NOTIFICATION_IDS.POMODORO,
        scheduleAt: new Date(endTime),
        title: 'Pomodoro Timer',
      });
    }
  }, [running, timer, times, selectedTab, setRunning]);

  const restart = useCallback(() => {
    if (interval.current) clearInterval(interval.current);

    const time = times[selectedTab] || 10;

    setRunning(false);
    setTimer(time);
    targetEndTimeRef.current = null;
    // Cancel any scheduled notification
    cancelNotification(NOTIFICATION_IDS.POMODORO);
  }, [times, selectedTab, setRunning]);

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <header className={styles.header}>
          <h2 className={styles.title}>Pomodoro Timer</h2>

          <div className={styles.button}>
            <Button
              icon={<IoMdSettings />}
              tooltip="Change Times"
              onClick={() => {
                onClose();
                setShowSetting(true);
              }}
            />
          </div>
        </header>

        <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={setSelectedTab} />
        <Timer timer={timer} />

        <div className={styles.control}>
          <p className={styles.completed}>
            {completions[selectedTab] || 0} completed
          </p>
          <div className={styles.buttons}>
            <Button
              icon={<FaUndo />}
              smallIcon
              tooltip="Restart"
              onClick={restart}
            />
            <Button
              icon={running ? <FaPause /> : <FaPlay />}
              smallIcon
              tooltip={running ? 'Pause' : 'Start'}
              onClick={toggleRunning}
            />
          </div>
        </div>
      </Modal>

      <Setting
        show={showSetting}
        times={times}
        onChange={times => {
          setShowSetting(false);
          setTimes(times);
          open();
        }}
        onClose={() => {
          setShowSetting(false);
          open();
        }}
      />
    </>
  );
}
