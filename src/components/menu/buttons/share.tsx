import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Modal } from '@/components/modal';

import { Button } from './button';

export function ShareButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Share Sounds</Button>

      {createPortal(
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h1>Share Sounds!</h1>
        </Modal>,
        document.body,
      )}
    </>
  );
}
