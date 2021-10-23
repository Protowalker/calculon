import {Stack} from "@mui/material";
import {TextOutput} from "./Output";

export function CalcOutput() {
  return (
    <Stack spacing={1} >
      <TextOutput />
      <TextOutput />
    </Stack>
  );
}
