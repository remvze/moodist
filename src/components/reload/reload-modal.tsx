import { useRegisterSW } from 'virtual:pwa-register/react'; // eslint-disable-line
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components/modal';

import styles from './reload.module.css';

export function ReloadModal() {
  const { t } = useTranslation();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setNeedRefresh(false);
  };

  return (
    <Modal show={needRefresh} onClose={close}>
      <h2 className={styles.title}>{t('modals.reload.title')}</h2>
      <p className={styles.desc}>{t('modals.reload.description')}</p>

      <div className={styles.buttons}>
        <button onClick={close}>{t('common.close')}</button>

        <button
          className={styles.primary}
          onClick={() => updateServiceWorker(true)}
        >
          {t('common.reload')}
        </button>
      </div>
    </Modal>
  );
}
