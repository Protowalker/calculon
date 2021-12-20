import { Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { selectOutputs } from "Store/Outputs";
import { encodeStore } from "Store/protobufLoad";
import { useAppSelector } from "../Store/Hooks";
import { selectInputs } from "../Store/Inputs";
import { InputFromData } from "./Inputs/Input";

export function CalcInput() {
  const inputs = useAppSelector((state) =>
    Object.values(selectInputs(state))
      .slice()
      .sort((a, b) => a.order - b.order)
  );
  const outputs = useAppSelector((state) =>
    Object.values(selectOutputs(state))
  );

  useEffect(() => {
    (async () => {
      console.log(await encodeStore(inputs, outputs));
    })();
  });

  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        {inputs.map((input) => (
          <InputFromData input={input} key={input.uuid} />
        ))}
      </Stack>
    </Stack>
  );
}
