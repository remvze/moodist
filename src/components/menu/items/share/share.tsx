import { useState } from 'react';
import { createPortal } from 'react-dom';
import { IoCopyOutline } from 'react-icons/io5/index';

import { Modal } from '@/components/modal';

import { Item } from '../../item';

import styles from './share.module.css';

export function Share() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Item onClick={() => setIsModalOpen(true)}>Share Sounds</Item>

      {createPortal(
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h1 className={styles.heading}>Share your sound selection!</h1>
          <p className={styles.desc}>
            Copy and send the following link to the person you want to share
            your selection with.
          </p>
          <div className={styles.inputWrapper}>
            <input type="text" onFocus={e => e.stopPropagation()} />
            <button>
              <IoCopyOutline />
            </button>
          </div>
        </Modal>,
        document.body,
      )}
    </>
  );
}
