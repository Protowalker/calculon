import { TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../Store/Hooks";
import { changeInput } from "../../Store/Inputs";
import { BaseInput, BaseInputData } from "./Input";

export type NumberInputData = BaseInputData & { kind: "number"; value: number };

export function NumberInput({ input }: { input: NumberInputData }) {
  const dispatch = useAppDispatch();

  const [textValue, setTextValue] = useState(input.value.toString());

  // If input value changes, update text value
  useEffect(() => {
    setTextValue(input.value.toString());
  }, [input.value]);

  const updateValue = useCallback(
    (value: string) => {
      setTextValue(value);
      dispatch(changeInput({ ...input, value: parseFloat(value) }));
    },
    [input, dispatch]
  );

  return (
    <BaseInput input={input}>
      <Typography variant="h6">{input.displayName}</Typography>
      <TextField
        size="small"
        placeholder="Input Value"
        value={textValue}
        type="number"
        onChange={(v) => updateValue(v.currentTarget.value)}
      ></TextField>
    </BaseInput>
  );
}
