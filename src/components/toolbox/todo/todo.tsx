import { Modal } from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';

import styles from './todo.module.css';

interface TodoProps {
  onClose: () => void;
  show: boolean;
}

export function Todo({ onClose, show }: TodoProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className={styles.title}>Todos</h2>
      <Form />
      <Todos />
    </Modal>
  );
}
