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
      <header className={styles.header}>
        <h2 className={styles.title}>Todo Checklist</h2>
        <p className={styles.desc}>Super simple todo list.</p>
      </header>

      <Form />
      <Todos />
    </Modal>
  );
}
