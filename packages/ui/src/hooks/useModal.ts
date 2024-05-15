import { create } from "zustand";

interface Action {
  open: () => void;
  close: () => void;
  openMessage: (message: string) => void;
}

interface State {
  isOpen: boolean;
  message: string;
}

const useModal = create<State & Action>((set, state) => ({
  isOpen: false,
  message: "",
  open: () => {
    set({
      ...state,
      isOpen: true,
    });
  },
  close: () => {
    set({
      isOpen: false,
      message: "",
    });
  },
  openMessage: (message) => {
    set({
      isOpen: true,
      message,
    });
  },
}));

export default useModal;
