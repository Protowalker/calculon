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
import { HiddenTextField, TypographyInput } from "util/MuiComponents";
import Box from "@mui/material/Box";

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <span>
          <TypographyInput
            variant="h6"
            value={output.displayName}
            readOnly={!editMode}
            inputProps={{ style: { textAlign: "right" } }}
          />{" "}
          {editMode && (
            <span>
              {"("}

              <TypographyInput
                variant="subtitle1"
                value={output.name}
                inputProps={{
                  size: output.name.length - 4,
                  style: { textAlign: "center" },
                }}
              />

              {")"}
            </span>
          )}
        </span>
        {editMode ? (
          <TextField
            value={output.value}
            onChange={(v: any) =>
              dispatch(
                changeOutput(output.name, { value: v.currentTarget.value })
              )
            }
            inputProps={{ size: output.value.length }}
            multiline
          />
        ) : (
          <Typography>{text}</Typography>
        )}
      </Box>
    </BaseOutput>
  );
}
