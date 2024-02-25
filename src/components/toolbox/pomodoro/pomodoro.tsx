import { useState } from 'react';

import { Modal } from '@/components/modal';
import { Tabs } from './tabs';
import { Timer } from './timer';

// import styles from './pomodoro.module.css';

interface PomodoroProps {
  onClose: () => void;
  show: boolean;
}

export function Pomodoro({ onClose, show }: PomodoroProps) {
  const [selectedTab, setSelectedTab] = useState('pomodoro');

  const tabs = [
    { id: 'pomodoro', label: 'Pomodoro' },
    { id: 'short', label: 'Break' },
    { id: 'long', label: 'Long Break' },
  ];

  return (
    <Modal show={show} onClose={onClose}>
      <h1>Pomodoro Timer</h1>
      <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={setSelectedTab} />
      <Timer />
    </Modal>
  );
}
