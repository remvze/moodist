import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';

import styles from './setting.module.css';

interface SettingProps {
  onChange: (newTimes: Record<string, number>) => void;
  onClose: () => void;
  show: boolean;
  times: Record<string, number>;
}

export function Setting({ onChange, onClose, show, times }: SettingProps) {
  const { t } = useTranslation();
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
      <h2 className={styles.title}>{t('modals.pomodoro.settings.title')}</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          id="pomodoro"
          labelKey="modals.pomodoro.settings.pomodoro-label"
          value={values.pomodoro}
          onChange={handleChange('pomodoro')}
        />
        <Field
          id="short"
          labelKey="modals.pomodoro.settings.short-break-label"
          value={values.short}
          onChange={handleChange('short')}
        />
        <Field
          id="long"
          labelKey="modals.pomodoro.settings.long-break-label"
          value={values.long}
          onChange={handleChange('long')}
        />

        <div className={styles.buttons}>
          <button type="button" onClick={handleCancel}>
            {t('common.cancel')}
          </button>
          <button className={styles.primary} type="submit">
            {t('common.save')}
          </button>
        </div>
      </form>
    </Modal>
  );
}

interface FieldProps {
  id: string;
  labelKey: string;
  onChange: (value: number | string) => void;
  value: number | string;
}

function Field({ id, labelKey, onChange, value }: FieldProps) {
  const { t } = useTranslation(); // 获取翻译函数
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {t(labelKey)}{' '}
        <span>({t('modals.pomodoro.settings.minutes-unit')})</span>{' '}
      </label>
      <input
        className={styles.input}
        id={id}
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
