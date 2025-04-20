import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';

import styles from './todo.module.css';

interface TodoProps {
  onClose: () => void;
  show: boolean;
}

export function Todo({ onClose, show }: TodoProps) {
  const { t } = useTranslation();

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('modals.todo.title')}</h2>
        <p className={styles.desc}>{t('modals.todo.description')}</p>
      </header>

      <Form />
      <Todos />
    </Modal>
  );
}
