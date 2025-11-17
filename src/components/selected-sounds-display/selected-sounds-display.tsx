import { useMemo } from 'react';
import { AnimatePresence } from 'motion/react';

import { useSoundStore } from '@/stores/sound';
import { useLocalizedSounds } from '@/hooks/useLocalizedSounds';
import { useTranslation } from '@/hooks/useTranslation';

import { Sound } from '@/components/sounds/sound';
import styles from '../sounds/sounds.module.css';

export function SelectedSoundsDisplay() {
  const { t } = useTranslation();
  const localizedCategories = useLocalizedSounds();

  // 获取选中的声音
  const selectedSoundIds = useSoundStore(state =>
    Object.keys(state.sounds).filter(id => state.sounds[id].isSelected)
  );

  // 获取选中的声音详细信息
  const selectedSounds = useMemo(() => {
    const allSounds = localizedCategories
      .map(category => category.sounds)
      .flat();

    return selectedSoundIds
      .map(id => allSounds.find(sound => sound.id === id))
      .filter(Boolean);
  }, [selectedSoundIds, localizedCategories]);

  // 如果没有选中任何声音，不显示组件
  if (selectedSounds.length === 0) {
    return null;
  }

  return (
    <div className={styles.sounds}>
      <AnimatePresence initial={false}>
        {selectedSounds.map((sound) => (
          <Sound
            key={sound.id}
            id={sound.id}
            icon={sound.icon}
            label={sound.label}
            src={sound.src}
            functional={false}
            displayMode={true}
            hidden={false}
            selectHidden={() => {}}
            unselectHidden={() => {}}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}