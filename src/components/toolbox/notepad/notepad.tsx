import { Modal } from '@/components/modal';

import styles from './notepad.module.css';
import { useNoteStore } from '@/store';

interface NotepadProps {
  onClose: () => void;
  show: boolean;
}

export function Notepad({ onClose, show }: NotepadProps) {
  const note = useNoteStore(state => state.note);
  const write = useNoteStore(state => state.write);

  return (
    <Modal show={show} wide onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.label}>Your Note</h2>
      </header>

      <textarea
        className={styles.textarea}
        dir="auto"
        value={note}
        onChange={e => write(e.target.value)}
      />
    </Modal>
  );
}
