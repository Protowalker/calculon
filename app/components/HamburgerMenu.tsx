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
import React, { useMemo } from "react";
import { useMatch } from "react-router";
import { useFetcher, useMatches } from "remix";
import { Destination, LoginBox } from "~/routes/login";

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
            <MenuContent />
          </DrawerBody>
          <DrawerFooter>BWAHHH</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function MenuContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useMatches()[0].params;
  const destination: Destination = useMemo(() => {
    if (typeof params.calcId !== "undefined")
      return `${params.username}/${params.calcId}` as Destination;
    else return "home";
  }, [params]);

  return (
    <>
      <Flex width="100%" alignItems="stretch">
        <Button width="100%" mr="1em" onClick={onOpen}>
          Log in
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <LoginBox destination={destination} />
          </ModalContent>
        </Modal>
        <Button width="100%">Sign up</Button>
      </Flex>
    </>
  );
}
