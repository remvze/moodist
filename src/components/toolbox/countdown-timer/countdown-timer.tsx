import { Modal } from '@/components/modal';

import { Form } from './form';
import { Timers } from './timers';

interface TimerProps {
  onClose: () => void;
  show: boolean;
}

export function CountdownTimer({ onClose, show }: TimerProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <Form />
      <Timers />
    </Modal>
  );
}
