import { Box, InputBase, InputBaseProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Variant } from "@mui/material/styles/createTypography";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const HiddenTextField: React.FC<TextFieldProps> = (
  props: TextFieldProps
) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLTextAreaElement>();
  return (
    <>
      <TextField
        {...props}
        sx={{
          ...props.sx,
          display: open ? "initial" : "none",
          minWidth: 0,
        }}
        onBlur={(ev) => {
          props.onBlur?.(ev);
          setOpen(false);
        }}
        inputRef={ref}
      />
      {props.children ?? (
        <span
          onClick={() => {
            ref.current?.select();
            setOpen(true);
            ref.current?.select();
          }}
        >
          {props.value as string}
        </span>
      )}
    </>
  );
};

export const TypographyInput = (
  props: InputBaseProps & { variant: Variant }
) => {
  const theme = useTheme();
  const [widthRef, setWidthRef] = useState<HTMLElement>();
  const [width, setWidth] = useState("10ch");
  useEffect(() => {
    setWidth(
      widthRef?.getBoundingClientRect().width.toString() + "px" ??
        (props.value as string)?.length
    );
  }, [widthRef, props.value]);

  return (
    <>
      <Box
        component="span"
        ref={(ref: HTMLElement) => setWidthRef(ref)}
        sx={{
          ...theme.typography[props.variant],
          ...props.sx,
          position: "absolute",
          visibility: "hidden",
        }}
      >
        {props.value as string}
      </Box>
      <InputBase
        {...props}
        sx={{
          ...theme.typography[props.variant],
          ...props.sx,
          width: width,
        }}
      />
    </>
  );
};
