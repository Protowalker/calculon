import { Flex, Input } from "@chakra-ui/react";
import BaseInput, { InputNames } from "components/Inputs/BaseInput";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../Store/Hooks";
import { changeInput } from "../../Store/Inputs";

export const NumberInputData = Object.freeze({
  kind: "number" as const,
  name: "",
  displayName: "A Number Input",
  order: -1,
  value: 0,
  uuid: "",
});

export default function NumberInput({
  input,
}: {
  input: typeof NumberInputData;
}) {
  const dispatch = useAppDispatch();

  const [textValue, setTextValue] = useState(input.value.toString());

  // If input value changes, update text value
  useEffect(() => {
    setTextValue(input.value.toString());
  }, [input.value]);

  const updateValue = useCallback(
    (value: string) => {
      setTextValue(value);
      dispatch(changeInput(input.uuid, { value: parseFloat(value) }));
    },
    [input, dispatch]
  );

  return (
    <BaseInput input={input}>
      <Flex direction="column">
        <InputNames input={input} />
        <Input
          size="small"
          placeholder="Input Value"
          value={textValue}
          type="number"
          onChange={(v) => updateValue(v.currentTarget.value)}
        />
      </Flex>
    </BaseInput>
  );
}
