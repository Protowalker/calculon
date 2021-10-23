import {Stack} from "@mui/material";
import {InputFromName} from "./Inputs/Input";
import {useAppSelector} from "../Store/Hooks";
import {selectInputNames} from "../Store/Inputs";

export function CalcInput() {
  const inputNames = useAppSelector(selectInputNames);

  return (
    <Stack spacing={1}>
      {inputNames.map((n) => (
        <InputFromName name={n} key={n} />
      ))}
    </Stack>
  );
}
