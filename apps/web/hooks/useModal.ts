import { create } from "zustand";

interface ModalAction {
  openModal: (open: boolean) => void;
}

interface ModalState {
  isOpen: boolean;
}

const useModal = create<ModalState & ModalAction>((set) => ({
  isOpen: false,
  openModal: (open) => {
    set({
      isOpen: open,
    });
  },
}));

export default useModal;
