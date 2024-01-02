import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5/index';

import { Tooltip } from '@/components/tooltip';
import { useSoundStore } from '@/store';

import styles from './menu.module.css';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const shuffle = useSoundStore(state => state.shuffle);

  return (
    <div className={styles.wrapper}>
      <Tooltip content="Menu" hideDelay={0} showDelay={0}>
        <button
          className={styles.menuButton}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </Tooltip>

      {isOpen && (
        <div className={styles.menu}>
          <button className={styles.menuItem} onClick={shuffle}>
            Shuffle Sounds
          </button>
        </div>
      )}
    </div>
  );
}
