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
      [id]: typeof value === 'number' ? value : '',
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
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Break Percentage</ModalTitle>
      </ModalHeader>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          id="break"
          label="Break"
          value={values.break}
          onChange={handleChange('break')}
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
        {label} <span>(%)</span>
      </label>
      <input
        className={styles.input}
        id={id}
        max={100}
        min={10}
        step={10}
        required
        type="number"
        value={typeof value === 'number' ? value : ''}
        onChange={e => {
          onChange(e.target.value === '' ? '' : Number(e.target.value));
        }}
      />
    </div>
  );
}
