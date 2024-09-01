import { Todo } from './todo';

import { useTodoStore } from '@/stores/todo';

import styles from './todos.module.css';

export function Todos() {
  const todos = useTodoStore(state => state.todos);

  return (
    <div className={styles.todos}>
      <header>
        <p className={styles.label}>Your Todos</p>
        <div className={styles.divider} />
        <p className={styles.counter}>0 / 0</p>
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
        <p className={styles.empty}>You don&apos;t have any todos.</p>
      )}
    </div>
  );
}
