import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Modal } from '@/components/modal';

import { Form } from './form';
import { Timers } from './timers';

import styles from './countdown-timer.module.css';

interface TimerProps {
  onClose: () => void;
  show: boolean;
}

export function CountdownTimer({ onClose, show }: TimerProps) {
  const [containerRef, enableAnimations] = useAutoAnimate<HTMLDivElement>();

  return (
    <Modal persist show={show} onClose={onClose}>
      <h2 className={styles.title}>Countdown Timer</h2>
      <Form enableAnimations={enableAnimations} />
      <Timers enableAnimations={enableAnimations} ref={containerRef} />
    </Modal>
  );
}
