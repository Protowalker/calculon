import { Flex, Input, Text, Textarea } from "@chakra-ui/react";
import _ from "lodash";
import { useMemo } from "react";
import { selectEditMode } from "Store/EditMode";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { selectInputs } from "Store/Inputs";
import { changeOutput } from "Store/Outputs";
import { TypographyInput } from "util/CustomComponents";
import BaseOutput from "./BaseOutput";
import { parseExpressionString } from "./Output";

export const TextOutputData = Object.freeze({
  kind: "text" as const,
  name: "",
  displayName: "A Text Output",
  uuid: "",
  order: -1,
  value: "",
});

export default function TextOutput({
  output,
}: {
  output: typeof TextOutputData;
}) {
  const inputs = useAppSelector((state) =>
    _(selectInputs(state))
      .mapKeys((input) => input.name)
      .mapValues((input) => input.value)
  ).value();
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();

  const text = useMemo(
    () => parseExpressionString(output.value).evaluate(inputs),
    [inputs, output.value]
  );

  return (
    <BaseOutput output={output}>
      <Flex direction="column">
        <span>
          <TypographyInput
            fontSize="xl"
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
        </span>
        {editMode ? (
          <Textarea
            value={output.value}
            onChange={(v) => {
              dispatch(
                changeOutput(output.uuid, { value: v.currentTarget.value })
              );
            }}
            isFullWidth
            width={output.value.length.toString() + "ch"}
            minWidth="30ch"
            maxWidth="80ch"
            overflowWrap="break-word"
          />
        ) : (
          <Text>{text}</Text>
        )}
      </Flex>
    </BaseOutput>
  );
}
