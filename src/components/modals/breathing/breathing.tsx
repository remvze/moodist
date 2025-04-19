import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';
import { Exercise } from './exercise';

import styles from './breathing.module.css';

interface TimerProps {
  onClose: () => void;
  show: boolean;
}

export function BreathingExerciseModal({ onClose, show }: TimerProps) {
  const { t } = useTranslation(); // Get t function
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className={styles.title || 'modal-title'}>
        {t('modals.breathing.title')}
      </h2>
      <Exercise />
    </Modal>
  );
}
