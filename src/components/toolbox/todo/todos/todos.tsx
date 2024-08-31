import { Todo } from './todo';

import { useTodoStore } from '@/stores/todo';

import styles from './todos.module.css';

export function Todos() {
  const todos = useTodoStore(state => state.todos);

  return (
    <div className={styles.todos}>
      {todos.map(todo => (
        <Todo done={todo.done} id={todo.id} key={todo.id} todo={todo.todo} />
      ))}
    </div>
  );
}
