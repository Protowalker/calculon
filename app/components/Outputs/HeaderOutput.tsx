import { Flex } from "@chakra-ui/react";
import _ from "lodash";
import { useMemo } from "react";
import { selectEditMode } from "~/Store/EditMode";
import { useAppDispatch, useAppSelector } from "~/Store/Hooks";
import { selectAllInputs } from "~/Store/Inputs";
import { changeOutput } from "~/Store/Outputs";
import { TypographyInput } from "~/util/CustomComponents";
import BaseOutput from "./BaseOutput";
import { parseExpressionString } from "./Output";

export const HeaderOutputData = Object.freeze<{
  kind: "header";
  name: string;
  displayName: string;
  value: string;
  order: number;
  uuid: string;
}>({
  kind: "header",
  name: "",
  displayName: "A Header",
  uuid: "",
  order: -1,
  value: "A Header",
});

export default function HeaderOutput({
  output,
}: {
  output: typeof HeaderOutputData;
}) {
  const inputs = useAppSelector((state) =>
    _(selectAllInputs(state))
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
      <TypographyInput
        fontSize="lg"
        fontWeight="bold"
        value={editMode ? output.value : text}
        isReadOnly={!editMode}
        onChange={(v) =>
          dispatch(
            changeOutput(output.uuid, {
              value: v.currentTarget.value,
            })
          )
        }
        maxWidth="100%"
        sx={{ textAlign: "right" }}
      />{" "}
    </BaseOutput>
  );
}
