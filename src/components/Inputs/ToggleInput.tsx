import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useAppDispatch } from "../../Store/Hooks";
import { changeInput } from "../../Store/Inputs";
import { BaseInput, BaseInputData } from "./Input";

export type ToggleInputData = BaseInputData & {
  kind: "toggle";
  value: boolean;
};

export function ToggleInput({ input }: { input: ToggleInputData }) {
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
