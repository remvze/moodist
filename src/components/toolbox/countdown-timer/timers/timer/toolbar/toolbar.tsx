import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io/index';

import { useCountdownTimers } from '@/stores/countdown-timers';

import styles from './toolbar.module.css';

interface ToolbarProps {
  first: boolean;
  id: string;
  last: boolean;
}

export function Toolbar({ first, id, last }: ToolbarProps) {
  const moveUp = useCountdownTimers(state => state.moveUp);
  const moveDown = useCountdownTimers(state => state.moveDown);

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
