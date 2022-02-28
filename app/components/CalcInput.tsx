import { Heading, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { selectOutputs } from "../Store/Outputs";
import { useAppSelector } from "../Store/Hooks";
import { selectInputs } from "../Store/Inputs";
import { InputFromData } from "./Inputs/Input";

export function CalcInput() {
  const inputs = useAppSelector((state) =>
    Object.values(selectInputs(state))
      .slice()
      .sort((a, b) => a.order - b.order)
  );

  return (
    <Stack spacing={1}>
      <Heading
        size="md"
        textAlign="center"
        color="gray.500"
        textTransform="uppercase"
      >
        Inputs
      </Heading>
      <Stack spacing={1}>
        {inputs.map((input) => (
          <InputFromData input={input} key={input.uuid} />
        ))}
      </Stack>
    </Stack>
  );
}
