import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { useTimers } from '@/stores/timers';

import styles from './toolbar.module.css';

interface ToolbarProps {
  first: boolean;
  id: string;
  last: boolean;
}

export function Toolbar({ first, id, last }: ToolbarProps) {
  const moveUp = useTimers(state => state.moveUp);
  const moveDown = useTimers(state => state.moveDown);

  return (
    <div className={styles.toolbar}>
      <button
        disabled={first}
        onClick={e => {
          e.stopPropagation();
          moveUp(id);
        }}
      >
        <IoIosArrowUp />
      </button>
      <button
        disabled={last}
        onClick={e => {
          e.stopPropagation();
          moveDown(id);
        }}
      >
        <IoIosArrowDown />
      </button>
    </div>
  );
}
