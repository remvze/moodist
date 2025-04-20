import { MdNotes } from 'react-icons/md/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

import { useNoteStore } from '@/stores/note';

interface NotepadProps {
  open: () => void;
}

export function Notepad({ open }: NotepadProps) {
  const { t } = useTranslation();
  const note = useNoteStore(state => state.note);

  return (
    <Item
      active={!!note.length}
      icon={<MdNotes />}
      label={t('toolbar.items.notepad')}
      shortcut="Shift + N"
      onClick={open}
    />
  );
}
