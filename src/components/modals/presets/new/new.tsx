import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/helpers/styles';
import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

import styles from './new.module.css';

export function New() {
  const { t } = useTranslation();
  const [name, setName] = useState('');

  const noSelected = useSoundStore(state => state.noSelected());
  const sounds = useSoundStore(state => state.sounds);
  const addPreset = usePresetStore(state => state.addPreset);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || noSelected) return;

    const _sounds: Record<string, number> = {};

    Object.keys(sounds)
      .filter(id => sounds[id].isSelected)
      .forEach(id => {
        _sounds[id] = sounds[id].volume;
      });

    addPreset(name, _sounds);

    setName('');
  };

  return (
    <div className={styles.new}>
      <h3 className={styles.title}>{t('modals.presets.new-preset-title')}</h3>

      <form
        className={cn(styles.form, noSelected && styles.disabled)}
        onSubmit={handleSubmit}
      >
        <input
          disabled={noSelected}
          placeholder={t('modals.presets.placeholder')}
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button disabled={noSelected}>{t('common.save')}</button>
      </form>

      {noSelected && (
        <p className={styles.noSelected}>
          {t('modals.presets.no-selected-warning')}
        </p>
      )}
    </div>
  );
}
