import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { selectEditMode } from "Store/EditMode";
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import { selectInputs } from "Store/Inputs";
import { parseExpressionString } from "./Output";
import _ from "lodash";
import { changeOutput } from "Store/Outputs";
import BaseOutput from "./BaseOutput";

export const TextOutputData = Object.freeze({
  kind: "text" as const,
  name: "",
  displayName: "A Text Output",
  order: -1,
  value: "",
});

export default function TextOutput({
  output,
}: {
  output: typeof TextOutputData;
}) {
  const inputs = useAppSelector((state) =>
    _.mapValues(selectInputs(state), (input) => input.value)
  );
  const editMode = useAppSelector(selectEditMode);
  const dispatch = useAppDispatch();

  const text = useMemo(
    () => parseExpressionString(output.value).evaluate(inputs),
    [inputs, output.value]
  );

  return (
    <BaseOutput output={output}>
      <Typography variant="h6">{output.displayName}</Typography>
      {editMode ? (
        <TextField
          value={output.value}
          onChange={(v: any) =>
            dispatch(
              changeOutput(output.name, { value: v.currentTarget.value })
            )
          }
          sx={{
            width: `${output.value.length + 3}ch`,
            maxWidth: "40vw",
            minWidth: "100%",
          }}
          multiline
        />
      ) : (
        <Typography>{text}</Typography>
      )}
    </BaseOutput>
  );
}
