import { useTranslation } from 'react-i18next';
import { Todo } from './todo';

import { useTodoStore } from '@/stores/todo';

import styles from './todos.module.css';

export function Todos() {
  const { t } = useTranslation();
  const todos = useTodoStore(state => state.todos);
  const doneCount = useTodoStore(state => state.doneCount());

  return (
    <div className={styles.todos}>
      <header>
        <p className={styles.label}>{t('modals.todo.your-todos-label')}</p>
        <div className={styles.divider} />
        <p className={styles.counter}>
          {doneCount} / {todos.length}
        </p>
      </header>

      {todos.length > 0 ? (
        <>
          {todos.map(todo => (
            <Todo
              done={todo.done}
              id={todo.id}
              key={todo.id}
              todo={todo.todo}
            />
          ))}
        </>
      ) : (
        <p className={styles.empty}>{t('modals.todo.empty')}</p>
      )}
    </div>
  );
}
