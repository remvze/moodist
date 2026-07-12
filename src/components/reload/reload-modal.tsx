import { useRegisterSW } from 'virtual:pwa-register/react'; // eslint-disable-line

import {
  Modal,
  ModalActions,
  ModalButton,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';

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
      <ModalHeader>
        <div>
          <ModalTitle>New Content</ModalTitle>
          <ModalDescription>
            New content available, click on reload button to update.
          </ModalDescription>
        </div>
      </ModalHeader>

      <ModalActions>
        <ModalButton onClick={close}>Close</ModalButton>
        <ModalButton
          variant="primary"
          onClick={() => updateServiceWorker(true)}
        >
          Reload
        </ModalButton>
      </ModalActions>
    </Modal>
  );
}
