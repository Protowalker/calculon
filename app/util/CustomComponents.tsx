import {
  Box,
  BoxProps,
  Input,
  InputProps,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { isServer } from "./misc";

export const TypographyInput = (props: InputProps) => {
  const [widthRef, setWidthRef] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState(`${(props.value as string).length + 3}ch`);
  useEffect(() => {
    const pxWidth = widthRef?.getBoundingClientRect().width;
    if (pxWidth) setWidth((pxWidth + 1).toString() + "px");
    else setWidth((props.value as string)?.length.toString() + "ch" ?? "20ch");
  }, [widthRef, props.value]);

  const textProps = { ...props };
  delete textProps.isReadOnly;
  delete textProps.isInvalid;

  return (
    <>
      <Box position="relative" width="0">
        <Text
          {...textProps}
          as="span"
          ref={(ref: HTMLElement | null) => setWidthRef(ref)}
          position="absolute"
          visibility="hidden"
          whiteSpace="pre"
        >
          {props.value as string}
        </Text>
      </Box>
      <Input
        {...props}
        variant="unstyled"
        p={0}
        width={width}
        minWidth="1ch"
        minHeight="1.6em"
        outlineColor={
          (props.value as string).length == 0 ? "gray.600" : "clear"
        }
      />
    </>
  );
};

export const MotionBox = motion<BoxProps>(Box);
export const MotionVStack = motion<StackProps>(VStack);
