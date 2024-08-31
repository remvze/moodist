import { FaRegTrashAlt } from 'react-icons/fa/index';

import { useTodoStore } from '@/stores/todo';
import { cn } from '@/helpers/styles';

import styles from './todo.module.css';

interface TodoProps {
  done: boolean;
  id: string;
  todo: string;
}

export function Todo({ done, id, todo }: TodoProps) {
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const editTodo = useTodoStore(state => state.editTodo);

  const handleCheck = () => toggleTodo(id);
  const handleDelete = () => deleteTodo(id);

  return (
    <div className={styles.wrapper}>
      <input
        checked={done}
        className={styles.checkbox}
        type="checkbox"
        onChange={handleCheck}
      />
      <input
        className={cn(styles.textbox, done && styles.done)}
        type="text"
        value={todo}
        onChange={e => editTodo(id, e.target.value)}
      />
      <button onClick={handleDelete}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}
