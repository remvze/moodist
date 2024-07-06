import { Modal } from '@/components/modal';

import styles from './shortcuts.module.css';

interface ShortcutsModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShortcutsModal({ onClose, show }: ShortcutsModalProps) {
  const shortcuts = [
    {
      keys: ['Shift', 'H'],
      label: 'Shortcuts List',
    },
    {
      keys: ['Shift', 'Alt', 'P'],
      label: 'Presets',
    },
    {
      keys: ['Shift', 'S'],
      label: 'Share Sounds',
    },
    {
      keys: ['Shift', 'N'],
      label: 'Notepad',
    },
    {
      keys: ['Shift', 'P'],
      label: 'Pomodoro Timer',
    },
    {
      keys: ['Shift', 'B'],
      label: 'Breathing Exercise',
    },
    {
      keys: ['Shift', 'T'],
      label: 'Sleep Timer',
    },
    {
      keys: ['Shift', 'Space'],
      label: 'Toggle Play',
    },
    {
      keys: ['Shift', 'R'],
      label: 'Unselect All Sounds',
    },
  ];

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>Keyboard Shortcuts</h1>
      <div className={styles.shortcuts}>
        {shortcuts.map(shortcut => (
          <Row
            key={shortcut.label}
            keys={shortcut.keys}
            label={shortcut.label}
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

interface KeyProps {
  children: React.ReactNode;
}

function Key({ children }: KeyProps) {
  return <div className={styles.key}>{children}</div>;
}
