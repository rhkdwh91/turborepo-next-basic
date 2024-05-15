import React, { ReactNode, useEffect, useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";
import ReactDom from "react-dom";
import emitter from "../../../utils/emitter";
import useModal from "../../../hooks/useModal";

const Action = {
  OPEN: "open",
  CLOSE: "close",
} as const;

export const modal = {
  open: () => {
    emitter.emit(Action.OPEN);
  },
  close: () => {
    emitter.emit(Action.CLOSE);
  },
};

interface LayoutProps {
  children: ReactNode;
}

function Container({ children }: LayoutProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={9998}
        backgroundColor="rgba(0,0,0,0.4)"
      />
      <Box
        position="fixed"
        backgroundColor="#fff"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        padding={5}
        borderRadius={10}
        zIndex={9999}
      >
        <div>{children}</div>
      </Box>
    </>
  );
}

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <Box>
      <Text fontSize={20} fontWeight="bold">
        {children}
      </Text>
    </Box>
  );
}

interface ContentProps {
  children: ReactNode;
}

function Content({ children }: ContentProps) {
  return (
    <Box paddingY={3} whiteSpace="pre-wrap">
      {children}
    </Box>
  );
}

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return (
    <Box display="flex" gap="4" justifyContent="center" marginTop={4}>
      {children}
    </Box>
  );
}

interface ModalProps {
  children: ReactNode;
}

function Portal({ children }: ModalProps) {
  const { isOpen, open, close } = useModal();

  const openModal = useCallback(() => {
    open();
  }, []);

  const closeModal = useCallback(() => {
    close();
  }, []);

  useEffect(() => {
    emitter.on(Action.OPEN, openModal);
    emitter.on(Action.CLOSE, closeModal);
    return () => {
      close();
      emitter.removeListener(Action.OPEN, openModal);
      emitter.removeListener(Action.CLOSE, closeModal);
    };
  }, []);

  if (document && isOpen) {
    const el = document.getElementById("modal-root") as HTMLElement;
    return ReactDom.createPortal(children, el);
  }

  return null;
}

export default Object.assign(Portal, {
  Container,
  Header,
  Content,
  Footer,
});
