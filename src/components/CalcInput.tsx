import Stack from "@mui/material/Stack";
import { selectEditMode } from "../Store/EditMode";
import { useAppDispatch, useAppSelector } from "../Store/Hooks";
import { selectInputs } from "../Store/Inputs";
import { InputFromData } from "./Inputs/Input";

export function CalcInput() {
  const inputs = useAppSelector((state) =>
    Object.values(selectInputs(state))
      .slice()
      .sort((a, b) => a.order - b.order)
  );

  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectEditMode);

  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        {inputs.map((input) => (
          <InputFromData input={input} key={input.name} />
        ))}
      </Stack>
    </Stack>
  );
}
