import { useState } from 'react';

import { useTodoStore } from '@/stores/todo';

import styles from './form.module.css';

export function Form() {
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
          placeholder="I have to ..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
