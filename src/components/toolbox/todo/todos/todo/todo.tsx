import { FaRegTrashAlt } from 'react-icons/fa/index';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/checkbox';

import { useTodoStore } from '@/stores/todo';
import { cn } from '@/helpers/styles';

import styles from './todo.module.css';
import { Tooltip } from '@/components/tooltip';

interface TodoProps {
  done: boolean;
  id: string;
  todo: string;
}

export function Todo({ done, id, todo }: TodoProps) {
  const { t } = useTranslation();
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const editTodo = useTodoStore(state => state.editTodo);

  const handleCheck = () => toggleTodo(id);
  const handleDelete = () => deleteTodo(id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkbox}>
        <Checkbox checked={done} onChange={handleCheck} />
      </div>
      <input
        className={cn(styles.textbox, done && styles.done)}
        type="text"
        value={todo}
        onChange={e => editTodo(id, e.target.value)}
      />
      <Tooltip content={t('common.delete')} showDelay={0}>
        <button
          className={styles.delete}
          aria-label={
            t('modals.todo.delete-button-aria-label') || `Delete todo: ${todo}`
          }
          onClick={handleDelete}
        >
          <FaRegTrashAlt />
        </button>
      </Tooltip>
    </div>
  );
}
