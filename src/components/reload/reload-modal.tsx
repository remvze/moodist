import { useRegisterSW } from 'virtual:pwa-register/react'; // eslint-disable-line

import { Modal } from '@/components/modal';

import styles from './reload.module.css';

export function ReloadModal() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setNeedRefresh(false);
  };

  return (
    <Modal show={needRefresh} onClose={close}>
      <h2 className={styles.title}>New Content</h2>
      <p className={styles.desc}>
        New content available, click on reload button to update.
      </p>

      <div className={styles.buttons}>
        <button onClick={close}>Close</button>

        <button
          className={styles.primary}
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </button>
      </div>
    </Modal>
  );
}
