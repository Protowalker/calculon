import { Flex, Input } from "@chakra-ui/react";
import BaseInput, { InputNames } from "~/components/Inputs/BaseInput";
import { useAppDispatch } from "~/Store/Hooks";
import { changeInput } from "~/Store/Inputs";

export const TextInputData = Object.freeze<{
  kind: "text";
  name: string;
  displayName: string;
  order: number;
  value: string;
  uuid: string;
}>({
  kind: "text",
  name: "",
  displayName: "A Text Input",
  order: -1,
  value: "",
  uuid: "",
});

export default function TextInput({ input }: { input: typeof TextInputData }) {
  const dispatch = useAppDispatch();

  return (
    <BaseInput input={input}>
      <Flex direction="column">
        <InputNames input={input} />
        <Input
          size="small"
          placeholder="Input Value"
          value={input.value}
          onChange={(v) =>
            dispatch(changeInput(input.uuid, { value: v.target.value }))
          }
        />
      </Flex>
    </BaseInput>
  );
}
