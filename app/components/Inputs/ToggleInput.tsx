import { Checkbox, Flex } from "@chakra-ui/react";
import BaseInput, { InputNames } from "~/components/Inputs/BaseInput";
import { useAppDispatch } from "~/Store/Hooks";
import { changeInput } from "~/Store/Inputs";

export const ToggleInputData = Object.freeze({
  kind: "toggle" as const,
  name: "",
  displayName: "A Toggle Input",
  order: -1,
  value: false,
  uuid: "",
});

//export type ToggleInputData = {
//  -readonly [K in keyof typeof ToggleInputData]: typeof ToggleInputData[K];
//};

export default function ToggleInput({
  input,
}: {
  input: typeof ToggleInputData;
}) {
  const dispatch = useAppDispatch();
  return (
    <BaseInput input={input}>
      <Flex direction="column">
        <Checkbox
          defaultChecked={input.value}
          checked={input.value}
          onChange={(v) =>
            dispatch(
              changeInput(input.uuid, { value: v.currentTarget.checked })
            )
          }
        >
          <InputNames input={input} />
        </Checkbox>
      </Flex>
    </BaseInput>
  );
}
