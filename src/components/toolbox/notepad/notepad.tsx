import { useRef, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi/index';
import { LuCopy, LuDownload } from 'react-icons/lu/index';
import { FaCheck } from 'react-icons/fa6/index';
import { FaUndo } from 'react-icons/fa/index';

import { Modal } from '@/components/modal';
import { Button } from './button';

import { useNoteStore } from '@/stores/note';
import { useCopy } from '@/hooks/use-copy';
import { download } from '@/helpers/download';

import styles from './notepad.module.css';

interface NotepadProps {
  onClose: () => void;
  show: boolean;
}

export function Notepad({ onClose, show }: NotepadProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const note = useNoteStore(state => state.note);
  const history = useNoteStore(state => state.history);
  const write = useNoteStore(state => state.write);
  const words = useNoteStore(state => state.words());
  const characters = useNoteStore(state => state.characters());
  const clear = useNoteStore(state => state.clear);
  const restore = useNoteStore(state => state.restore);

  const { copy, copying } = useCopy();

  useEffect(() => {
    if (show && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    }
  }, [show]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();

    if (e.key === 'Escape') onClose();
  };

  return (
    <Modal show={show} wide onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.label}>Your Note</h2>
        <div className={styles.buttons}>
          <Button
            icon={copying ? <FaCheck /> : <LuCopy />}
            tooltip="Copy Note"
            onClick={() => copy(note)}
          />
          <Button
            icon={<LuDownload />}
            tooltip="Download Note"
            onClick={() => download('Moodit Note.txt', note)}
          />
          <Button
            critical={!history}
            icon={history ? <FaUndo /> : <BiTrash />}
            recommended={!!history}
            tooltip={history ? 'Restore Note' : 'Clear Note'}
            onClick={() => (history ? restore() : clear())}
          />
        </div>
      </header>

      <textarea
        className={styles.textarea}
        dir="auto"
        placeholder="What is on your mind?"
        ref={textareaRef}
        spellCheck={false}
        value={note}
        onChange={e => write(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <p className={styles.counter}>
        {characters} character{characters !== 1 && 's'} • {words} word
        {words !== 1 && 's'}
      </p>
    </Modal>
  );
}
