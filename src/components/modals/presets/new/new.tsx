import { useRef, useState, type FormEvent } from 'react';

import { cn } from '@/helpers/styles';
import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';
import { useSnackbar } from '@/contexts/snackbar';

import styles from './new.module.css';

export function New({ onSaved }: { onSaved?: () => void }) {
  const [name, setName] = useState('');
  const isSubmitting = useRef(false);

  const noSelected = useSoundStore(state => state.noSelected());
  const sounds = useSoundStore(state => state.sounds);
  const addPreset = usePresetStore(state => state.addPreset);
  const showSnackbar = useSnackbar();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const label = name.trim();
    if (!label || noSelected || isSubmitting.current) return;
    isSubmitting.current = true;

    const _sounds: Record<string, number> = {};

    Object.keys(sounds)
      .filter(id => sounds[id].isSelected)
      .forEach(id => {
        _sounds[id] = sounds[id].volume;
      });

    addPreset(label, _sounds);
    showSnackbar('Mix saved.');

    setName('');
    onSaved?.();
  };

  return (
    <div className={styles.new}>
      <h3 className={styles.title}>Save current mix</h3>

      <form
        className={cn(styles.form, noSelected && styles.disabled)}
        onSubmit={handleSubmit}
      >
        <input
          disabled={noSelected}
          placeholder="Name this mix"
          required
          maxLength={60}
          type="text"
          value={name}
          onChange={e => {
            isSubmitting.current = false;
            setName(e.target.value);
          }}
        />
        <button disabled={noSelected}>Save</button>
      </form>

      {noSelected && (
        <p className={styles.noSelected}>Select some sounds to save a mix.</p>
      )}
    </div>
  );
}
