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
  const words = useNoteStore(state => state.words());
  const characters = useNoteStore(state => state.characters());

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

      <p className={styles.counter}>
        {characters} character{characters !== 1 && 's'} • {words} word
        {words !== 1 && 's'}
      </p>
    </Modal>
  );
}
