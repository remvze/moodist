import { useEffect, useState } from 'react';

import { Modal } from '@/components/modal';

import styles from './setting.module.css';

// 安全地获取localStorage
function getLocalStorageItem(key: string, defaultValue: string = 'en'): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

interface SettingProps {
  onChange: (newTimes: Record<string, number>) => void;
  onClose: () => void;
  show: boolean;
  times: Record<string, number>;
}

export function Setting({ onChange, onClose, show, times }: SettingProps) {
  const [values, setValues] = useState<Record<string, number | string>>(times);
  const [currentLang, setCurrentLang] = useState('en');

  // 在客户端初始化语言
  useEffect(() => {
    const lang = getLocalStorageItem('moodist-language');
    setCurrentLang(lang);
    
    // 监听语言变化
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

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

  // 获取本地化文本
  const titleText = currentLang === 'zh' ? '更改时间' : 'Change Times';
  const pomodoroLabel = currentLang === 'zh' ? '番茄钟' : 'Pomodoro';
  const shortBreakLabel = currentLang === 'zh' ? '短休息' : 'Short Break';
  const longBreakLabel = currentLang === 'zh' ? '长休息' : 'Long Break';
  const cancelText = currentLang === 'zh' ? '取消' : 'Cancel';
  const saveText = currentLang === 'zh' ? '保存' : 'Save';

  return (
    <Modal lockBody={false} show={show} onClose={onClose}>
      <h2 className={styles.title}>{titleText}</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          id="pomodoro"
          label={pomodoroLabel}
          value={values.pomodoro}
          onChange={handleChange('pomodoro')}
        />
        <Field
          id="short"
          label={shortBreakLabel}
          value={values.short}
          onChange={handleChange('short')}
        />
        <Field
          id="long"
          label={longBreakLabel}
          value={values.long}
          onChange={handleChange('long')}
        />

        <div className={styles.buttons}>
          <button type="button" onClick={handleCancel}>
            {cancelText}
          </button>
          <button className={styles.primary} type="submit">
            {saveText}
          </button>
        </div>
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
