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

export const TypographyInput = (props: InputProps) => {
  const [widthRef, setWidthRef] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState("10ch");
  useEffect(() => {
    const pxWidth = widthRef?.getBoundingClientRect().width;
    if (pxWidth) setWidth((pxWidth + 1).toString() + "px");
    else setWidth((props.value as string)?.length.toString() + "ch" ?? "20ch");
  }, [widthRef, props.value]);

  return (
    <>
      <Text
        {...props}
        as="span"
        ref={(ref: HTMLElement | null) => setWidthRef(ref)}
        position="absolute"
        visibility="hidden"
        whiteSpace="pre"
      >
        {props.value as string}
      </Text>
      <Input {...props} variant="unstyled" p={0} width={width} />
    </>
  );
};

export const MotionBox = motion<BoxProps>(Box);
export const MotionVStack = motion<StackProps>(VStack);
