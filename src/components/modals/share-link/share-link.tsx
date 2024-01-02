import { IoCopyOutline } from 'react-icons/io5/index';

import { Modal } from '@/components/modal';

import styles from './share-link.module.css';

interface ShareLinkModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShareLinkModal({ onClose, show }: ShareLinkModalProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>Share your sound selection!</h1>
      <p className={styles.desc}>
        Copy and send the following link to the person you want to share your
        selection with.
      </p>
      <div className={styles.inputWrapper}>
        <input type="text" value="https://moodist.app/?share=test" />
        <button>
          <IoCopyOutline />
        </button>
      </div>
    </Modal>
  );
}
