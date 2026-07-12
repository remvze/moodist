import { Modal, ModalHeader, ModalTitle } from '@/components/modal';
import { Exercise } from './exercise';

interface TimerProps {
  onClose: () => void;
  show: boolean;
}

export function BreathingExerciseModal({ onClose, show }: TimerProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Breathing Exercise</ModalTitle>
      </ModalHeader>
      <Exercise />
    </Modal>
  );
}
