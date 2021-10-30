import { Input, InputProps, Text, TypographyProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const TypographyInput = (
  props: InputProps & { fontSize: TypographyProps["fontSize"] }
) => {
  const [widthRef, setWidthRef] = useState<HTMLElement | null>(null);
  const [width, setWidth] = useState("10ch");
  useEffect(() => {
    setWidth(
      widthRef?.getBoundingClientRect().width.toString() + "px" ??
        (props.value as string)?.length + "ch" ??
        "20ch"
    );
  }, [widthRef, props.value]);

  return (
    <>
      <Text
        component="span"
        ref={(ref: HTMLElement | null) => setWidthRef(ref)}
        fontSize={props.fontSize}
        sx={{
          ...props.sx,
          position: "absolute",
          visibility: "hidden",
        }}
      >
        {props.value as string}
      </Text>
      <Input
        {...props}
        fontSize={props.fontSize}
        variant="unstyled"
        sx={{
          ...props.sx,
          p: 0,
          width: width,
        }}
      />
    </>
  );
};
