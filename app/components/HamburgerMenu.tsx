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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { useMatch } from "react-router";
import { Form, useFetcher, useMatches } from "remix";
import { useSessionInfo } from "~/sessions";
import { LoginBox } from "./LoginBox";
import { RegisterBox } from "./RegisterBox";

const HamburgerIcon = () => (
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
);

export default function HamburgerMenu(props: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const sessionInfo = useSessionInfo();

  return (
    <>
      <Button onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Calculon</DrawerHeader>
          <DrawerBody>
            {typeof sessionInfo.userId === "undefined" ?
            <LoggedOutMenuContent onActionComplete={onClose} />
            :
            <LoggedInMenuContent onActionComplete={onClose} />
}
          </DrawerBody>
          <DrawerFooter>BWAHHH</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}


function LoggedOutMenuContent(props: { onActionComplete: () => void }) {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

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
            <LoginBox onSuccess={loginCallback} />
          </ModalContent>
        </Modal>
        <Button width="100%" onClick={onRegisterOpen}>
          Register
        </Button>
        <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
          <ModalOverlay />
          <ModalContent>
            <RegisterBox onSuccess={registerCallback} />
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}

function LoggedInMenuContent(props: { onActionComplete: () => void }) {
  const sessionInfo = useSessionInfo();
  const username = sessionInfo.username!;
  
  return  (<>
        <Text>Hey there, {username}!</Text>
        <Form action="/logout" method="post">
        <Button width="100%" mr="1em" type="submit">
          Log out
        </Button>
        </Form>
  </>);
}