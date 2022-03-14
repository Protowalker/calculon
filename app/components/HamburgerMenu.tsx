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
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";

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
  return (
    <>
      <Flex width="100%" alignItems="stretch">
        <Button width="100%" mr="1em">
          Log in
        </Button>
        <Button width="100%">Sign up</Button>
      </Flex>
    </>
  );
}
