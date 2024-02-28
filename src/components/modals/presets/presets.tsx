import { Modal } from '@/components/modal';
import { New } from './new';
import { List } from './list';

import styles from './presets.module.css';

interface PresetsModalProps {
  onClose: () => void;
  show: boolean;
}

export function PresetsModal({ onClose, show }: PresetsModalProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className={styles.title}>Presets</h2>
      <New />
      <div className={styles.divider} />
      <List close={onClose} />
    </Modal>
  );
}
