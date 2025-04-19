import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTodoStore } from '@/stores/todo';

import styles from './form.module.css';

export function Form() {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const addTodo = useTodoStore(state => state.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim().length) return;

    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          placeholder={t('modals.todo.add-placeholder')}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">{t('modals.todo.add-button')}</button>
      </div>
    </form>
  );
}
