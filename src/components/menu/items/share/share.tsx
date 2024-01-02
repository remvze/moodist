import { useState } from 'react';
import { createPortal } from 'react-dom';

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
          <h1 className={styles.heading}>Share Sounds!</h1>
        </Modal>,
        document.body,
      )}
    </>
  );
}
