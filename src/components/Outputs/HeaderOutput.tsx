import { Flex } from "@chakra-ui/react";
import { selectEditMode } from "Store/EditMode";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { changeOutput } from "Store/Outputs";
import { TypographyInput } from "util/CustomComponents";
import BaseOutput from "./BaseOutput";

export const HeaderOutputData = Object.freeze({
  kind: "header" as const,
  name: "",
  displayName: "A Header",
  uuid: "",
  order: -1,
  value: "",
});

export default function HeaderOutput({
  output,
}: {
  output: typeof HeaderOutputData;
}) {
  //const inputs = useAppSelector((state) =>
  //  _(selectInputs(state))
  //    .mapKeys((input) => input.name)
  //    .mapValues((input) => input.value)
  //).value();
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();

  //const text = useMemo(
  //  () => parseExpressionString(output.value).evaluate(inputs),
  //  [inputs, output.value]
  //);

  return (
    <BaseOutput output={output}>
      <TypographyInput
        fontSize="lg"
        fontWeight="bold"
        value={output.displayName}
        isReadOnly={!editMode}
        onChange={(v) =>
          dispatch(
            changeOutput(output.uuid, {
              displayName: v.currentTarget.value,
            })
          )
        }
        sx={{ textAlign: "right" }}
      />{" "}
    </BaseOutput>
  );
}
