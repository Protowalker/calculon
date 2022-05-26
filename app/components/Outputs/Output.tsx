import { arrayToObjectNotation } from "@chakra-ui/utils";
import * as math from "mathjs";
import { parseDependencies } from "mathjs";
import { useMemo } from "react";
import { OutputData } from "~/Store/Outputs";
import { OutputComponentMap } from "./OutputMap";

const expressionRegex = /\{\{([\s\S]+?)\}\}/gm;

export function parseExpressionString(expr: string): {
  evaluate: (scope: Record<string, unknown>) => string;
  usedVals: Set<string>;
} {
  const text = expr.split(expressionRegex);
  let compiledExpr: Array<string | math.EvalFunction>;
  let requestedValues: Set<string>;

  try {
    // Explanation: The regex splits based on matching the pattern `text {{expr}} text`,
    // so every other entry (1, 3, 5) is going to be an expression and everything else is text.
    const parsedExprs = text.map((v, i) => (i % 2 === 0 ? v : math.parse(v)));

    requestedValues = new Set(
      parsedExprs.reduce((acc: string[], cur) => {
        if (typeof cur !== "object") return acc;
        const vals: string[] = [];
        cur.traverse((node) => {
          if (node.type === "SymbolNode") vals.push(node.name);
        });
        return [...acc, ...vals];
      }, [])
    );
    compiledExpr = parsedExprs.map((v) =>
      typeof v === "object" ? v.compile() : v
    );
  } catch (e) {
    return {
      usedVals: new Set(),
      evaluate: (scope: Record<string, unknown>) => (e as Error).message,
    };
  }
  return {
    usedVals: requestedValues,
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

export function OutputFromData({ output }: { output: OutputData }) {
  const OutputComponent = OutputComponentMap[output.kind];

  return <OutputComponent output={output as never} />;
}

export function useExpression(
  expression: string,
  inputs: { [x: string]: string | number | boolean }
): { output: string; usedValues: Set<string> } {
  const parsed = useMemo(() => {
    const parsed = parseExpressionString(expression);
    return { output: parsed.evaluate(inputs), usedValues: parsed.usedVals };
  }, [inputs, expression]);

  return parsed;
}
