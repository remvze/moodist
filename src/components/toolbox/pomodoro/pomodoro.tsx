import { useState, useEffect, useRef, useMemo } from 'react';
import { FaUndo, FaPlay, FaPause } from 'react-icons/fa/index';

import { Modal } from '@/components/modal';
import { Tabs } from './tabs';
import { Timer } from './timer';
import { Button } from './button';

import styles from './pomodoro.module.css';

interface PomodoroProps {
  onClose: () => void;
  show: boolean;
}

export function Pomodoro({ onClose, show }: PomodoroProps) {
  const [selectedTab, setSelectedTab] = useState('pomodoro');
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(10);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const tabs = useMemo(
    () => [
      { id: 'pomodoro', label: 'Pomodoro', time: 60 },
      { id: 'short', label: 'Break', time: 60 },
      { id: 'long', label: 'Long Break', time: 60 },
    ],
    [],
  );

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
    if (timer <= 0) {
      if (interval.current) clearInterval(interval.current);

      setRunning(false);
    }
  }, [timer]);

  useEffect(() => {
    const time = tabs.find(tab => tab.id === selectedTab)?.time || 10;

    if (interval.current) clearInterval(interval.current);

    setRunning(false);
    setTimer(time);
  }, [selectedTab, tabs]);

  const toggleRunning = () => {
    if (running) setRunning(false);
    else if (timer <= 0) {
      const time = tabs.find(tab => tab.id === selectedTab)?.time || 10;

      setTimer(time);
      setRunning(true);
    } else setRunning(true);
  };

  const restart = () => {
    if (interval.current) clearInterval(interval.current);

    const time = tabs.find(tab => tab.id === selectedTab)?.time || 10;

    setRunning(false);
    setTimer(time);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h1>Pomodoro Timer</h1>
      <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={setSelectedTab} />
      <Timer timer={timer} />

      <div className={styles.control}>
        <p className={styles.completed}>0 completed</p>
        <div className={styles.buttons}>
          <Button icon={<FaUndo />} tooltip="Restart" onClick={restart} />
          <Button
            icon={running ? <FaPause /> : <FaPlay />}
            tooltip={running ? 'Pause' : 'Start'}
            onClick={toggleRunning}
          />
        </div>
      </div>
    </Modal>
  );
}
