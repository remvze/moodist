import {
  Modal,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';
import { Form } from './form';
import { Todos } from './todos';

interface TodoProps {
  onClose: () => void;
  show: boolean;
}

export function Todo({ onClose, show }: TodoProps) {
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>
        <div>
          <ModalTitle>Todo Checklist</ModalTitle>
          <ModalDescription>Super simple todo list.</ModalDescription>
        </div>
      </ModalHeader>

      <Form />
      <Todos />
    </Modal>
  );
}
