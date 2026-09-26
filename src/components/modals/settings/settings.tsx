import {
  Modal,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';
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
      <ModalHeader>
        <div>
          <ModalTitle>Settings</ModalTitle>
          <ModalDescription>Adjust sound and alarm volume.</ModalDescription>
        </div>
      </ModalHeader>

      <div className={styles.settings}>
        <VolumeSetting
          description="Controls the overall level of your sound mix."
          label="Sound volume"
          value={globalVolume}
          onChange={setGlobalVolume}
        />
        <VolumeSetting
          description="Controls timer and countdown alerts."
          label="Alarm volume"
          value={alarmVolume}
          onChange={setAlarmVolume}
        />
      </div>
    </Modal>
  );
}

interface VolumeSettingProps {
  description: string;
  label: string;
  onChange: (volume: number) => void;
  value: number;
}

function VolumeSetting({
  description,
  label,
  onChange,
  value,
}: VolumeSettingProps) {
  return (
    <div className={styles.setting}>
      <div className={styles.settingHeader}>
        <div>
          <p className={styles.label}>{label}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <span className={styles.value}>{Math.round(value * 100)}%</span>
      </div>
      <Slider
        ariaLabel={label}
        max={100}
        min={0}
        value={value * 100}
        onChange={nextValue => onChange(nextValue / 100)}
      />
    </div>
  );
}
