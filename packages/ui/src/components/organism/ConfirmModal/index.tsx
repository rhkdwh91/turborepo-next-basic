import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import Modal from "../Modal";
import emitter from "../../../utils/emitter";
import useModal from "../../../hooks/useModal";

const Action = {
  OPEN_MESSAGE: "openMessage",
  CONFIRM: "onClickConfirm",
} as const;

interface ConfirmModalProps {
  message: string;
  onClickConfirm: () => void;
}

export const confirm = {
  open: ({ message, onClickConfirm }: ConfirmModalProps) => {
    emitter.emit(Action.OPEN_MESSAGE, { message });
    emitter.on(Action.CONFIRM, onClickConfirm);
  },
};

export default function ConfirmModal() {
  const { message, openMessage, close } = useModal();
  const openConfirmModal = ({ message }: ConfirmModalProps) => {
    openMessage(message);
  };
  const handleClickConfirm = () => {
    emitter.emit(Action.CONFIRM);
    close();
  };
  const handleClickCancel = () => {
    close();
  };
  useEffect(() => {
    emitter.on(Action.OPEN_MESSAGE, openConfirmModal);
    return () => {
      emitter.removeAllListeners(Action.OPEN_MESSAGE);
      emitter.removeAllListeners(Action.CONFIRM);
    };
  }, []);
  return (
    <Modal>
      <Modal.Container>
        <Modal.Header>Confirm</Modal.Header>
        <Modal.Content>{message}</Modal.Content>
        <Modal.Footer>
          <Button variant="ghost" onClick={handleClickConfirm}>
            확인
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleClickCancel}>
            취소
          </Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
}
