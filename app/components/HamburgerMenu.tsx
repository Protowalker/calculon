import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { useMatch } from "react-router";
import { useFetcher, useMatches } from "remix";
import { LoginBox } from "./LoginBox";
import { RegisterBox } from "./RegisterBox";

export default function HamburgerMenu(props: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        <Flex height="2.5em" justifyContent="space-evenly" direction="column">
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              width="2em"
              height="20%"
              backgroundColor="gray.400"
              borderRadius="base"
            />
          ))}
        </Flex>
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Calculon</DrawerHeader>
          <DrawerBody>
            <MenuContent onActionComplete={onClose}/>
          </DrawerBody>
          <DrawerFooter>BWAHHH</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function MenuContent(props: {onActionComplete: (() => void)}) {
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure();


  const loginCallback = useCallback(() => {
    onLoginClose();
    props.onActionComplete();
  }, [onLoginClose, props.onActionComplete]);

  const registerCallback = useCallback(() => {
    onRegisterClose();
    props.onActionComplete();
  }, [onRegisterClose, props.onActionComplete]);

  return (
    <>
      <Flex width="100%" alignItems="stretch">
        <Button width="100%" mr="1em" onClick={onLoginOpen}>
          Log in
        </Button>
        <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
          <ModalOverlay />
          <ModalContent>
            <LoginBox onSuccess={loginCallback}/>
          </ModalContent>
        </Modal>
        <Button width="100%" onClick={onRegisterOpen}>Register</Button>
        <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
          <ModalOverlay />
          <ModalContent>
            <RegisterBox onSuccess={registerCallback}/>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
