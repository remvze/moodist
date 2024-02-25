import { useEffect, useState } from 'react';

import { Modal } from '@/components/modal';

import styles from './setting.module.css';

interface SettingProps {
  onChange: (newTimes: Record<string, number>) => void;
  onClose: () => void;
  show: boolean;
  times: Record<string, number>;
}

export function Setting({ onChange, onClose, show, times }: SettingProps) {
  const [values, setValues] = useState(times);

  useEffect(() => setValues(times), [times]);

  const handleChange = (id: string) => (value: number) => {
    setValues(prev => ({ ...prev, [id]: value * 60 }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    onChange(values);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className={styles.title}>Change Times</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          id="pomodoro"
          label="Pomodoro"
          value={values.pomodoro / 60}
          onChange={handleChange('pomodoro')}
        />
        <Field
          id="short"
          label="Short Break"
          value={values.short / 60}
          onChange={handleChange('short')}
        />
        <Field
          id="long"
          label="Long Break"
          value={values.long / 60}
          onChange={handleChange('long')}
        />

        <div className={styles.buttons}>
          <button
            onClick={e => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancel
          </button>
          <button className={styles.primary}>Save</button>
        </div>
      </form>
    </Modal>
  );
}

interface FieldProps {
  id: string;
  label: string;
  onChange: (value: number) => void;
  value: number;
}

function Field({ id, label, onChange, value }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label} <span>(minutes)</span>
      </label>
      <input
        className={styles.input}
        max={120}
        min={1}
        type="number"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
}
