import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../Store/Hooks";
import { changeInput } from "../../Store/Inputs";
import BaseInput from "components/Inputs/BaseInput";

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
      <Typography variant="h6">{input.displayName}</Typography>
      <TextField
        size="small"
        placeholder="Input Value"
        value={input.value}
        onChange={(v: any) =>
          dispatch(changeInput({ ...input, value: v.target.value }))
        }
      ></TextField>
    </BaseInput>
  );
}
