import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { changeInput, selectInput } from "../../Store/Inputs";
import { BaseInput, BaseInputData } from "./Input";

export type TextInputData = BaseInputData & { kind: "text"; value: string };

export function TextInput({ input }: { input: TextInputData }) {
  const dispatch = useAppDispatch();

  return (
    <BaseInput input={input}>
      <Typography variant="h6">{input.displayName}</Typography>
      <TextField
        size="small"
        placeholder="Input Value"
        value={input.value}
        onChange={(v) =>
          dispatch(changeInput({ ...input, value: v.target.value }))
        }
      ></TextField>
    </BaseInput>
  );
}
