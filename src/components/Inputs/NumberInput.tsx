import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../Store/Hooks";
import { changeInput } from "../../Store/Inputs";
import BaseInput, { InputNames } from "components/Inputs/BaseInput";

export const NumberInputData = Object.freeze({
  kind: "number" as const,
  name: "",
  displayName: "A Number Input",
  order: -1,
  value: 0,
});

export default function NumberInput({
  input,
}: {
  input: typeof NumberInputData;
}) {
  const dispatch = useAppDispatch();

  const [textValue, setTextValue] = useState(input.value.toString());

  // If input value changes, update text value
  useEffect(() => {
    setTextValue(input.value.toString());
  }, [input.value]);

  const updateValue = useCallback(
    (value: string) => {
      setTextValue(value);
      dispatch(changeInput(input.name, { value: parseFloat(value) }));
    },
    [input, dispatch]
  );

  return (
    <BaseInput input={input}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <InputNames input={input} />
        <TextField
          size="small"
          placeholder="Input Value"
          value={textValue}
          type="number"
          onChange={(v: any) => updateValue(v.currentTarget.value)}
        ></TextField>
      </Box>
    </BaseInput>
  );
}
