import { useRef, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi/index';
import { LuCopy, LuDownload } from 'react-icons/lu/index';
import { FaCheck } from 'react-icons/fa6/index';
import { FaUndo } from 'react-icons/fa/index';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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

  const counterOptions = {
    chars: characters,
    chars_plural:
      characters !== 1 ? t('common.plural-suffix', { defaultValue: 's' }) : '',
    words: words,
    words_plural:
      words !== 1 ? t('common.plural-suffix', { defaultValue: 's' }) : '',
  };

  const clearOrRestoreTooltip = history
    ? t('modals.notepad.restore-tooltip')
    : t('modals.notepad.clear-tooltip');
  const copyTooltip = copying
    ? t('common.copied')
    : t('modals.notepad.copy-tooltip');

  return (
    <Modal show={show} wide onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.label}>{t('modals.notepad.title-label')}</h2>
        <div className={styles.buttons}>
          <Button
            icon={copying ? <FaCheck /> : <LuCopy />}
            tooltip={copyTooltip}
            onClick={() => copy(note)}
          />
          <Button
            icon={<LuDownload />}
            tooltip={t('modals.notepad.download-tooltip')}
            onClick={() => download('Moodist Note.txt', note)}
          />
          <Button
            critical={!history}
            icon={history ? <FaUndo /> : <BiTrash />}
            recommended={!!history}
            tooltip={clearOrRestoreTooltip}
            onClick={() => (history ? restore() : clear())}
          />
        </div>
      </header>

      <textarea
        className={styles.textarea}
        dir="auto"
        placeholder={t('modals.notepad.placeholder')}
        ref={textareaRef}
        spellCheck={false}
        value={note}
        onChange={e => write(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <p className={styles.counter}>
        {t('modals.notepad.counter-stats', counterOptions)}
      </p>
    </Modal>
  );
}
