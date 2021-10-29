import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import BaseInput from "components/Inputs/BaseInput";
import { useAppDispatch } from "../../Store/Hooks";
import { changeInput } from "../../Store/Inputs";

export const ToggleInputData = Object.freeze({
  kind: "toggle" as const,
  name: "",
  displayName: "A Toggle Input",
  order: -1,
  value: false,
});

//export type ToggleInputData = {
//  -readonly [K in keyof typeof ToggleInputData]: typeof ToggleInputData[K];
//};

export default function ToggleInput({
  input,
}: {
  input: typeof ToggleInputData;
}) {
  const dispatch = useAppDispatch();
  return (
    <BaseInput input={input}>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value}
            onChange={(v) =>
              dispatch(
                changeInput({ ...input, value: v.currentTarget.checked })
              )
            }
          />
        }
        label={<Typography variant="h6">{input.displayName}</Typography>}
      />
    </BaseInput>
  );
}
