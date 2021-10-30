import { InputBase, InputBaseProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Variant } from "@mui/material/styles/createTypography";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { useRef, useState } from "react";

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
  return (
    <InputBase
      {...props}
      sx={{ ...theme.typography[props.variant], ...props.sx }}
    />
  );
};
