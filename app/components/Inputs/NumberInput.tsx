import { Flex, Input, Tooltip } from "@chakra-ui/react";
import BaseInput, { InputNames } from "~/components/Inputs/BaseInput";
import { useCallback } from "react";
import { useValidatedValue, Validator } from "~/util/Hooks";
import { useAppDispatch } from "~/Store/Hooks";
import { changeInput } from "~/Store/Inputs";

export const NumberInputData = Object.freeze<{
  kind: "number";
  name: string;
  displayName: string;
  order: number;
  value: number;
  uuid: string;
}>({
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
  const validator = useCallback<Validator<string>>((text: string) => {
    if (text !== "" && isNaN(Number(text)) === false) return [true];
    else return [false, `invalid number "${text}"`];
  }, []);
  const onValid = useCallback(
    (text: string) =>
      dispatch(changeInput(input.uuid, { value: parseFloat(text) })),
    [dispatch, input.uuid]
  );

  const [rawText, updateText, validText, error] = useValidatedValue(
    validator,
    input.value.toString(),
    onValid
  );

  const textValid = validText === rawText;

  return (
    <BaseInput input={input}>
      <Flex direction="column">
        <InputNames input={input} />
        <Tooltip isDisabled={textValid} label={error}>
          <Input
            size="small"
            placeholder="Input Value"
            value={rawText}
            onChange={(v) => updateText(v.currentTarget.value)}
            isInvalid={!textValid}
          />
        </Tooltip>
      </Flex>
    </BaseInput>
  );
}
