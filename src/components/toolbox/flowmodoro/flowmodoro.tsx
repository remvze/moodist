import { useState, useEffect, useMemo } from 'react';
import { FaUndo, FaPlay, FaPause, FaCheck } from 'react-icons/fa/index';
import { IoMdSettings } from 'react-icons/io/index';

import { Modal } from '@/components/modal';
import { Button } from '../generics/button';
import { Timer } from './timer';
import { Tabs } from './tabs';
import { Setting } from './setting';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { useFlowmodoroStore } from '@/stores/flowmodoro';
import { useSettingsStore } from '@/stores/settings';
import { useCloseListener } from '@/hooks/use-close-listener';

import styles from './flowmodoro.module.css';

interface FlowmodoroProps {
  onClose: () => void;
  open: () => void;
  show: boolean;
}

export function Flowmodoro({ onClose, open, show }: FlowmodoroProps) {
  const [showSetting, setShowSetting] = useState(false);

  const [selectedTab, setSelectedTab] = useState('flowmodoro');

  const running = useFlowmodoroStore(state => state.running);
  const setRunning = useFlowmodoroStore(state => state.setRunning);

  const [focusSeconds, setFocusSeconds] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const timer = selectedTab === 'break' ? breakSeconds : focusSeconds;
  const alarmVolume = useSettingsStore(state => state.alarmVolume);

  const alarm = useSoundEffect('/sounds/alarm.mp3', alarmVolume);

  const defaultBreakPercentage = useMemo(() => ({ break: 20 }), []);

  const [breakPercentage, setBreakPercentage] = useLocalStorage<
    Record<string, number>
  >('moodist-flowmodoro-setting', defaultBreakPercentage);
  const [breakDuration, setBreakDuration] = useState(0);

  const [completions, setCompletions] = useState<Record<string, number>>({
    flowmodoro: 0,
    break: 0,
  });

  const tabs = useMemo(
    () => [
      { id: 'flowmodoro', label: 'Flowmodoro' },
      { id: 'break', label: 'Break' },
    ],
    [],
  );

  useCloseListener(() => setShowSetting(false));

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      if (selectedTab === 'break') {
        setBreakSeconds(previous => Math.max(0, previous - 1));
      } else {
        setFocusSeconds(previous => previous + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running, selectedTab]);

  useEffect(() => {
    if (selectedTab === 'break' && breakSeconds === 0 && running) {
      alarm.play();
      setRunning(false);
      setCompletions(previous => ({
        ...previous,
        break: previous.break + 1,
      }));
    }
  }, [breakSeconds, selectedTab, running, setRunning, alarm]);

  const selectTab = (tab: string) => {
    if (tab === selectedTab) return;
    setRunning(false);
    setSelectedTab(tab);
  };

  const toggleRunning = () => {
    if (running) {
      setRunning(false);
    } else if (selectedTab !== 'break' || breakSeconds > 0) {
      setRunning(true);
    }
  };

  const finishFocus = () => {
    if (focusSeconds === 0) return;
    const duration = Math.max(
      1,
      Math.round((focusSeconds * breakPercentage.break) / 100),
    );
    setRunning(false);
    setBreakDuration(duration);
    setBreakSeconds(duration);
    setFocusSeconds(0);
    setCompletions(previous => ({
      ...previous,
      flowmodoro: previous.flowmodoro + 1,
    }));
    setSelectedTab('break');
  };

  const restart = () => {
    setRunning(false);
    if (selectedTab === 'break') {
      setBreakSeconds(breakDuration);
    } else {
      setFocusSeconds(0);
    }
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <header className={styles.header}>
          <h2 className={styles.title}>Flowmodoro Timer</h2>

          <div className={styles.button}>
            <Button
              icon={<IoMdSettings />}
              tooltip="Change break percentage"
              onClick={() => {
                onClose();
                setShowSetting(true);
              }}
            />
          </div>
        </header>

        <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={selectTab} />
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
              disabled={selectedTab === 'break' && breakSeconds === 0}
              onClick={toggleRunning}
            />
            {selectedTab === 'flowmodoro' && (
              <Button
                icon={<FaCheck />}
                smallIcon
                tooltip="Finish focus and prepare break"
                disabled={focusSeconds === 0}
                onClick={finishFocus}
              />
            )}
          </div>
        </div>
      </Modal>

      <Setting
        show={showSetting}
        times={breakPercentage}
        onChange={value => {
          setShowSetting(false);
          setBreakPercentage(value);
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
