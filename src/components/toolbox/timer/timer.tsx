import { Modal } from '@/components/modal';

interface TimerProps {
  onClose: () => void;
  show: boolean;
}

export function Timer({ onClose, show }: TimerProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <h1>Hello World</h1>
    </Modal>
  );
}
