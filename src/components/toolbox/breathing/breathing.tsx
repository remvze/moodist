import { Modal } from '@/components/modal';
import { Exercise } from './exercise';

import styles from './breathing.module.css';

interface TimerProps {
  onClose: () => void;
  show: boolean;
}

export function BreathingExercise({ onClose, show }: TimerProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className={styles.title}>Breathing Exercise</h2>
      <Exercise />
    </Modal>
  );
}
