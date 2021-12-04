import { Flex, Input } from "@chakra-ui/react";
import BaseInput, { InputNames } from "components/Inputs/BaseInput";
import { useCallback } from "react";
import { useValidatedValue } from "util/Hooks";
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
  const validator = useCallback(
    (text: string) => isNaN(Number(text)) === false,
    []
  );
  const onValid = useCallback(
    (text: string) =>
      dispatch(changeInput(input.uuid, { value: parseFloat(text) })),
    [dispatch, input.uuid]
  );

  const [rawText, updateText, validText] = useValidatedValue(
    validator,
    input.value.toString(),
    onValid
  );

  return (
    <BaseInput input={input}>
      <Flex direction="column">
        <InputNames input={input} />
        <Input
          size="small"
          placeholder="Input Value"
          value={rawText}
          onChange={(v) => updateText(v.currentTarget.value)}
          isInvalid={rawText !== validText}
        />
      </Flex>
    </BaseInput>
  );
}
