import { Input, InputProps, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const TypographyInput = (props: InputProps) => {
  const [widthRef, setWidthRef] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState("10ch");
  useEffect(() => {
    setWidth(
      widthRef?.getBoundingClientRect().width.toString() + "px" ??
        (props.value as string)?.length.toString() + "ch" ??
        "20ch"
    );
  }, [widthRef, props.value]);

  return (
    <>
      <Text
        {...props}
        component="span"
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
