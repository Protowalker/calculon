import { Stack } from "@chakra-ui/react";
import { useAppSelector } from "../Store/Hooks";
import { selectOutputs } from "../Store/Outputs";
import { OutputFromData } from "./Outputs/Output";

export function CalcOutput() {
  const outputs = useAppSelector((state) =>
    Object.values(selectOutputs(state))
  );
  return (
    <Stack spacing={1} maxWidth="50rem">
      {outputs.map((output) => (
        <OutputFromData output={output} key={output.uuid} />
      ))}
    </Stack>
  );
}
