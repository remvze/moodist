// src/components/modals/shortcuts/shortcuts.tsx
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal'; // Assuming Modal component is stable
import styles from './shortcuts.module.css'; // Assuming styles are correct

interface ShortcutsModalProps {
  onClose: () => void; // Function to close the modal
  show: boolean; // Boolean to control modal visibility
}

interface ShortcutItem {
  keys: string[];
  labelKey: string;
}

const shortcutsList: ShortcutItem[] = [
  { keys: ['Shift', 'H'], labelKey: 'toolbar.items.shortcuts' }, // Reusing toolbar item key
  { keys: ['Shift', 'Alt', 'P'], labelKey: 'toolbar.items.presets' },
  { keys: ['Shift', 'S'], labelKey: 'toolbar.items.share' },
  { keys: ['Shift', 'Alt', 'T'], labelKey: 'toolbar.items.sleep-timer' },
  { keys: ['Shift', 'C'], labelKey: 'toolbar.items.countdown' },
  { keys: ['Shift', 'P'], labelKey: 'toolbar.items.pomodoro' },
  { keys: ['Shift', 'N'], labelKey: 'toolbar.items.notepad' },
  { keys: ['Shift', 'T'], labelKey: 'toolbar.items.todo' },
  { keys: ['Shift', 'B'], labelKey: 'toolbar.items.breathing' },
  { keys: ['Shift', 'Space'], labelKey: 'modals.shortcuts.labels.toggle-play' }, // Specific key
  { keys: ['Shift', 'R'], labelKey: 'modals.shortcuts.labels.unselect-all' }, // Specific key
];

export function ShortcutsModal({ onClose, show }: ShortcutsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>{t('modals.shortcuts.title')}</h1>
      <div className={styles.shortcuts}>
        {shortcutsList.map(shortcut => (
          // Render a Row for each shortcut item
          // Use the labelKey as the React key for stability if IDs aren't available
          <Row
            key={shortcut.labelKey}
            keys={shortcut.keys}
            // Get the translated label using the defined labelKey
            label={t(shortcut.labelKey)}
          />
        ))}
      </div>
    </Modal>
  );
}

interface RowProps {
  keys: Array<string>;
  label: string;
}

function Row({ keys, label }: RowProps) {
  return (
    <div className={styles.row}>
      <p className={styles.label}>{label}</p>
      <div className={styles.divider} />
      <div className={styles.keys}>
        {keys.map(key => (
          <Key key={`${label}-${key}`}>{key}</Key>
        ))}
      </div>
    </div>
  );
}

// Props for the Key component
interface KeyProps {
  children: React.ReactNode; // The text content (key name)
}

// Component to render a single keyboard key representation
function Key({ children }: KeyProps) {
  // Simple div with styling for a key
  return <div className={styles.key}>{children}</div>;
}
