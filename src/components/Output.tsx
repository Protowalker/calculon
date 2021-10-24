import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as math from "mathjs";
import { useMemo, useState } from "react";
import { selectEditMode } from "../Store/EditMode";
import { useAppSelector } from "../Store/Hooks";
import { InputData, selectInput, selectInputNames } from "../Store/Inputs";

export function TextOutput() {
  const inputs = useAppSelector((state) =>
    selectInputNames(state)
      .map((name) => selectInput(state, name))
      .reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {})
  );

  const editMode = useAppSelector(selectEditMode);

  const [rawText, setRawText] = useState(
    "{{aTextInput}} {{aToggleInput}} is {{aNumberInput + 5}} years old."
  );
  const text = useMemo(
    () => parseExpressionString(rawText).evaluate(inputs),
    [inputs, rawText]
  );

  return (
    <Paper sx={{ p: "0.5rem", textAlign: "right" }}>
      <Typography variant="h6">Output Name</Typography>
      {editMode ? (
        <TextField
          value={rawText}
          onChange={(v) => setRawText(v.currentTarget.value)}
          sx={{ width: `${rawText.length}ch` }}
        />
      ) : (
        <Typography>{text}</Typography>
      )}
    </Paper>
  );
}

const expressionRegex = /\{\{(.+?)\}\}/g;

function parseExpressionString(expr: string) {
  const text = expr.split(expressionRegex);
  let compiledExpr: Array<string | math.EvalFunction>;
  try {
    compiledExpr = text.map((v, i) =>
      i % 2 === 0 ? v : math.parse(v).compile()
    );
  } catch (e) {
    return {
      evaluate: (scope: Record<string, unknown>) => (e as Error).message,
    };
  }
  return {
    evaluate: (scope: Record<string, unknown>) => {
      try {
        return compiledExpr
          .map((v, i) => (typeof v === "object" ? v.evaluate(scope) : v))
          .join(" ");
      } catch (e) {
        return (e as Error).message;
      }
    },
  };
}
