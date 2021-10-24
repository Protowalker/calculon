import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "../Store/Hooks";
import { selectInputs } from "../Store/Inputs";
import { InputFromData } from "./Inputs/Input";

export function CalcInput() {
  const inputs = useAppSelector((state) =>
    Object.values(selectInputs(state)).sort((a, b) => a.order - b.order)
  );

  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        {inputs.map((input) => (
          <InputFromData input={input} key={input.name} />
        ))}
      </Stack>
      <ButtonGroup>
        <Button color="primary">Number</Button>
        <Button color="primary">Number</Button>
        <Button color="primary">Number</Button>
      </ButtonGroup>
    </Stack>
  );
}
