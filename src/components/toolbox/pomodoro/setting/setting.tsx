import { useEffect, useState } from 'react';

import {
  Modal,
  ModalActions,
  ModalButton,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';

import styles from './setting.module.css';

interface SettingProps {
  onChange: (newTimes: Record<string, number>) => void;
  onClose: () => void;
  show: boolean;
  times: Record<string, number>;
}

export function Setting({ onChange, onClose, show, times }: SettingProps) {
  const [values, setValues] = useState<Record<string, number | string>>(times);

  useEffect(() => {
    if (show) setValues(times);
  }, [times, show]);

  const handleChange = (id: string) => (value: number | string) => {
    setValues(prev => ({
      ...prev,
      [id]: typeof value === 'number' ? value * 60 : '',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newValues: Record<string, number> = {};

    Object.keys(values).forEach(name => {
      newValues[name] =
        typeof values[name] === 'number' ? values[name] : times[name];
    });

    onChange(newValues);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    onClose();
  };

  return (
    <Modal lockBody={false} show={show} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Change Times</ModalTitle>
      </ModalHeader>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          id="pomodoro"
          label="Pomodoro"
          value={values.pomodoro}
          onChange={handleChange('pomodoro')}
        />
        <Field
          id="short"
          label="Short Break"
          value={values.short}
          onChange={handleChange('short')}
        />
        <Field
          id="long"
          label="Long Break"
          value={values.long}
          onChange={handleChange('long')}
        />

        <ModalActions>
          <ModalButton type="button" onClick={handleCancel}>
            Cancel
          </ModalButton>
          <ModalButton variant="primary" type="submit">
            Save
          </ModalButton>
        </ModalActions>
      </form>
    </Modal>
  );
}

interface FieldProps {
  id: string;
  label: string;
  onChange: (value: number | string) => void;
  value: number | string;
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
        required
        type="number"
        value={typeof value === 'number' ? value / 60 : ''}
        onChange={e => {
          onChange(e.target.value === '' ? '' : Number(e.target.value));
        }}
      />
    </div>
  );
}
