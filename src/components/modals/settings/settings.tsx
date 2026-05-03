import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';
import { useSettingsStore } from '@/stores/settings';

import styles from './settings.module.css';

interface SettingsModalProps {
  onClose: () => void;
  show: boolean;
}

export function SettingsModal({ onClose, show }: SettingsModalProps) {
  const globalVolume = useSettingsStore(state => state.globalVolume);
  const alarmVolume = useSettingsStore(state => state.alarmVolume);
  const setGlobalVolume = useSettingsStore(state => state.setGlobalVolume);
  const setAlarmVolume = useSettingsStore(state => state.setAlarmVolume);

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>Settings</h2>
        <p className={styles.desc}>Control global and alarm volumes.</p>
      </header>

      <div className={styles.group}>
        <p className={styles.label}>Global Volume</p>
        <Slider
          max={100}
          min={0}
          value={globalVolume * 100}
          onChange={value => setGlobalVolume(value / 100)}
        />
      </div>

      <div className={styles.group}>
        <p className={styles.label}>Alarm Volume</p>
        <Slider
          max={100}
          min={0}
          value={alarmVolume * 100}
          onChange={value => setAlarmVolume(value / 100)}
        />
      </div>
    </Modal>
  );
}
