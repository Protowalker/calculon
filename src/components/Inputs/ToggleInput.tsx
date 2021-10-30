import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import BaseInput, { InputNames } from "components/Inputs/BaseInput";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { selectEditMode } from "Store/EditMode";
import { changeInput } from "../../Store/Inputs";
import { nanoid } from "@reduxjs/toolkit";

export const ToggleInputData = Object.freeze({
  kind: "toggle" as const,
  name: "",
  displayName: "A Toggle Input",
  order: -1,
  value: false,
  uuid: "",
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
  const editMode = useAppSelector(selectEditMode);
  return (
    <BaseInput input={input}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={input.value}
              onChange={(v) =>
                dispatch(
                  changeInput(input.uuid, { value: v.currentTarget.checked })
                )
              }
            />
          }
          label={<InputNames input={input} />}
        />
      </Box>
    </BaseInput>
  );
}
