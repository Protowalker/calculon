import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { changeInput } from "../../Store/Inputs";
import BaseInput, { InputNames } from "components/Inputs/BaseInput";
import { TypographyInput } from "util/MuiComponents";
import { selectEditMode } from "Store/EditMode";
import { Box } from "@mui/material";

export const TextInputData = Object.freeze({
  kind: "text" as const,
  name: "",
  displayName: "A Text Input",
  order: -1,
  value: "",
});

export default function TextInput({ input }: { input: typeof TextInputData }) {
  const dispatch = useAppDispatch();

  return (
    <BaseInput input={input}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <InputNames input={input} />
        <TextField
          size="small"
          placeholder="Input Value"
          value={input.value}
          onChange={(v: any) =>
            dispatch(changeInput(input.name, { value: v.target.value }))
          }
        ></TextField>
      </Box>
    </BaseInput>
  );
}
